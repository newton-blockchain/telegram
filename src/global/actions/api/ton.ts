import type { GlobalState } from '../../types';

import { TON_MSG_ADDRESS_REQUEST, TON_MSG_ADDRESS_RESPONSE } from '../../../config';
import { getCurrentTabId } from '../../../util/establishMultitabRole';
import { addActionHandler, getGlobal, setGlobal } from '../..';
import { getMessageText } from '../../helpers';
import { selectChatMessages, selectCurrentMessageList } from '../../selectors';

addActionHandler('requestTonAddress', (global, actions, payload): void => {
  const { tabId = getCurrentTabId() } = payload || {};
  const { chatId } = selectCurrentMessageList(global, tabId) || {};
  if (!chatId) {
    return;
  }

  const wasRequested = Object.values(selectChatMessages(global, chatId)).some((message) => {
    return message.isOutgoing && getMessageText(message) === TON_MSG_ADDRESS_REQUEST;
  });
  if (wasRequested) {
    return;
  }

  const currentMessageList = selectCurrentMessageList(global, tabId);
  actions.sendMessage({
    messageList: currentMessageList!,
    text: TON_MSG_ADDRESS_REQUEST,
    tabId,
  });
});

addActionHandler('shareTonAddress', (global, actions, payload): void => {
  const { ton } = window as any;
  if (!ton) {
    return;
  }

  const { requesterId, requestedAt, tabId = getCurrentTabId() } = payload;

  const { lastAddressShareAt } = global.ton.byChatId[requesterId] || {};
  if (lastAddressShareAt && lastAddressShareAt >= requestedAt) {
    return;
  }

  (async () => {
    const addresses = await ton.send('ton_requestAccounts');

    global = getGlobal();

    const { chatId } = selectCurrentMessageList(global, tabId) || {};
    if (chatId !== requesterId) {
      return;
    }

    const currentMessageList = selectCurrentMessageList(global, tabId);
    actions.sendMessage({
      messageList: currentMessageList!,
      text: `${TON_MSG_ADDRESS_RESPONSE}${addresses[0]}`,
      tabId,
    });

    global = {
      ...global,
      ton: {
        ...global.ton,
        byChatId: {
          ...global.ton.byChatId,
          [requesterId]: {
            ...global.ton.byChatId[requesterId],
            lastAddressShareAt: Date.now(),
          },
        },
      },
    };

    setGlobal(global);
  })();
});

addActionHandler('saveTonAddress', (global, actions, payload): GlobalState | void => {
  const { chatId, address } = payload;

  const { address: currentAddress } = global.ton.byChatId[chatId] || {};

  if (currentAddress === address) {
    return undefined;
  }

  return {
    ...global,
    ton: {
      ...global.ton,
      byChatId: {
        ...global.ton.byChatId,
        [chatId]: {
          ...global.ton.byChatId[chatId],
          address,
        },
      },
    },
  };
});
