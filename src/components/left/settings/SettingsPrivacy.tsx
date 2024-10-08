import type { FC } from '../../../lib/teact/teact';
import React, { memo, useCallback, useEffect } from '../../../lib/teact/teact';
import { getActions, withGlobal } from '../../../global';

import type { GlobalState } from '../../../global/types';
import type { ApiPrivacySettings } from '../../../types';
import { SettingsScreens } from '../../../types';

import { selectCanSetPasscode, selectIsCurrentUserPremium } from '../../../global/selectors';

import useHistoryBack from '../../../hooks/useHistoryBack';
import useOldLang from '../../../hooks/useOldLang';

import StarIcon from '../../common/icons/StarIcon';
import Checkbox from '../../ui/Checkbox';
import ListItem from '../../ui/ListItem';

type OwnProps = {
  isActive?: boolean;
  onScreenSelect: (screen: SettingsScreens) => void;
  onReset: () => void;
};

type StateProps = {
  isCurrentUserPremium?: boolean;
  hasPassword?: boolean;
  hasPasscode?: boolean;
  canSetPasscode?: boolean;
  blockedCount: number;
  webAuthCount: number;
  isSensitiveEnabled?: boolean;
  canChangeSensitive?: boolean;
  canDisplayAutoarchiveSetting: boolean;
  shouldArchiveAndMuteNewNonContact?: boolean;
  shouldNewNonContactPeersRequirePremium?: boolean;
  canDisplayChatInTitle?: boolean;
  privacy: GlobalState['settings']['privacy'];
};

const SettingsPrivacy: FC<OwnProps & StateProps> = ({
  isActive,
  isCurrentUserPremium,
  hasPassword,
  hasPasscode,
  blockedCount,
  webAuthCount,
  isSensitiveEnabled,
  canChangeSensitive,
  canDisplayAutoarchiveSetting,
  shouldArchiveAndMuteNewNonContact,
  shouldNewNonContactPeersRequirePremium,
  canDisplayChatInTitle,
  canSetPasscode,
  privacy,
  onScreenSelect,
  onReset,
}) => {
  const {
    loadPrivacySettings,
    loadBlockedUsers,
    loadContentSettings,
    updateContentSettings,
    loadGlobalPrivacySettings,
    updateGlobalPrivacySettings,
    loadWebAuthorizations,
    setSettingOption,
  } = getActions();

  useEffect(() => {
    loadBlockedUsers();
    loadPrivacySettings();
    loadContentSettings();
    loadWebAuthorizations();
  }, []);

  useEffect(() => {
    if (isActive) {
      loadGlobalPrivacySettings();
    }
  }, [isActive, loadGlobalPrivacySettings]);

  const lang = useOldLang();

  useHistoryBack({
    isActive,
    onBack: onReset,
  });

  const handleArchiveAndMuteChange = useCallback((isEnabled: boolean) => {
    updateGlobalPrivacySettings({
      shouldArchiveAndMuteNewNonContact: isEnabled,
    });
  }, [updateGlobalPrivacySettings]);

  const handleChatInTitleChange = useCallback((isChecked: boolean) => {
    setSettingOption({
      canDisplayChatInTitle: isChecked,
    });
  }, []);

  const handleUpdateContentSettings = useCallback((isChecked: boolean) => {
    updateContentSettings(isChecked);
  }, [updateContentSettings]);

  function getVisibilityValue(setting?: ApiPrivacySettings) {
    if (!setting) return lang('Loading');

    const { visibility, shouldAllowPremium } = setting;
    const blockCount = setting.blockChatIds.length + setting.blockUserIds.length;
    const allowCount = setting.allowChatIds.length + setting.allowUserIds.length;
    const total = [];
    if (blockCount) total.push(`-${blockCount}`);
    if (allowCount) total.push(`+${allowCount}`);

    const exceptionString = total.length ? `(${total.join(',')})` : '';

    if (shouldAllowPremium) {
      return lang(exceptionString ? 'ContactsAndPremium' : 'PrivacyPremium');
    }

    switch (visibility) {
      case 'everybody':
        return `${lang('P2PEverybody')} ${exceptionString}`;

      case 'contacts':
        return `${lang('P2PContacts')} ${exceptionString}`;

      case 'nobody':
        return `${lang('P2PNobody')} ${exceptionString}`;
    }

    return undefined;
  }

  return (
    <div className="settings-content custom-scroll">
      <div className="settings-item pt-3">
        <ListItem
          icon="delete-user"
          narrow
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => onScreenSelect(SettingsScreens.PrivacyBlockedUsers)}
        >
          {lang('BlockedUsers')}
          <span className="settings-item__current-value">{blockedCount || ''}</span>
        </ListItem>
        {canSetPasscode && (
          <ListItem
            icon="key"
            narrow
            // eslint-disable-next-line react/jsx-no-bind
            onClick={() => onScreenSelect(
              hasPasscode ? SettingsScreens.PasscodeEnabled : SettingsScreens.PasscodeDisabled,
            )}
          >
            <div className="multiline-menu-item">
              <span className="title">{lang('Passcode')}</span>
              <span className="subtitle" dir="auto">
                {lang(hasPasscode ? 'PasswordOn' : 'PasswordOff')}
              </span>
            </div>
          </ListItem>
        )}
        <ListItem
          icon="lock"
          narrow
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => onScreenSelect(
            hasPassword ? SettingsScreens.TwoFaEnabled : SettingsScreens.TwoFaDisabled,
          )}
        >
          <div className="multiline-menu-item">
            <span className="title">{lang('TwoStepVerification')}</span>
            <span className="subtitle" dir="auto">
              {lang(hasPassword ? 'PasswordOn' : 'PasswordOff')}
            </span>
          </div>
        </ListItem>
        {webAuthCount > 0 && (
          <ListItem
            icon="web"
            narrow
            // eslint-disable-next-line react/jsx-no-bind
            onClick={() => onScreenSelect(SettingsScreens.ActiveWebsites)}
          >
            {lang('PrivacySettings.WebSessions')}
            <span className="settings-item__current-value">{webAuthCount}</span>
          </ListItem>
        )}
      </div>

      <div className="settings-item">
        <h4 className="settings-item-header" dir={lang.isRtl ? 'rtl' : undefined}>{lang('PrivacyTitle')}</h4>

        <ListItem
          narrow
          className="no-icon"
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => onScreenSelect(SettingsScreens.PrivacyPhoneNumber)}
        >
          <div className="multiline-menu-item">
            <span className="title">{lang('PrivacyPhoneTitle')}</span>
            <span className="subtitle" dir="auto">
              {getVisibilityValue(privacy.phoneNumber)}
            </span>
          </div>
        </ListItem>
        <ListItem
          narrow
          className="no-icon"
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => onScreenSelect(SettingsScreens.PrivacyLastSeen)}
        >
          <div className="multiline-menu-item">
            <span className="title">{lang('LastSeenTitle')}</span>
            <span className="subtitle" dir="auto">
              {getVisibilityValue(privacy.lastSeen)}
            </span>
          </div>
        </ListItem>
        <ListItem
          narrow
          className="no-icon"
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => onScreenSelect(SettingsScreens.PrivacyProfilePhoto)}
        >
          <div className="multiline-menu-item">
            <span className="title">{lang('PrivacyProfilePhotoTitle')}</span>
            <span className="subtitle" dir="auto">
              {getVisibilityValue(privacy.profilePhoto)}
            </span>
          </div>
        </ListItem>
        <ListItem
          narrow
          className="no-icon"
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => onScreenSelect(SettingsScreens.PrivacyBio)}
        >
          <div className="multiline-menu-item">
            <span className="title">{lang('PrivacyBio')}</span>
            <span className="subtitle" dir="auto">
              {getVisibilityValue(privacy.bio)}
            </span>
          </div>
        </ListItem>
        <ListItem
          narrow
          className="no-icon"
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => onScreenSelect(SettingsScreens.PrivacyBirthday)}
        >
          <div className="multiline-menu-item">
            <span className="title">{lang('PrivacyBirthday')}</span>
            <span className="subtitle" dir="auto">
              {getVisibilityValue(privacy.birthday)}
            </span>
          </div>
        </ListItem>
        <ListItem
          narrow
          className="no-icon"
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => onScreenSelect(SettingsScreens.PrivacyForwarding)}
        >
          <div className="multiline-menu-item">
            <span className="title">{lang('PrivacyForwardsTitle')}</span>
            <span className="subtitle" dir="auto">
              {getVisibilityValue(privacy.forwards)}
            </span>
          </div>
        </ListItem>
        <ListItem
          narrow
          className="no-icon"
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => onScreenSelect(SettingsScreens.PrivacyPhoneCall)}
        >
          <div className="multiline-menu-item">
            <span className="title">{lang('WhoCanCallMe')}</span>
            <span className="subtitle" dir="auto">
              {getVisibilityValue(privacy.phoneCall)}
            </span>
          </div>
        </ListItem>
        <ListItem
          narrow
          allowDisabledClick
          rightElement={isCurrentUserPremium && <StarIcon size="big" type="premium" />}
          className="no-icon"
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => onScreenSelect(SettingsScreens.PrivacyVoiceMessages)}
        >
          <div className="multiline-menu-item">
            <span className="title">{lang('PrivacyVoiceMessagesTitle')}</span>
            <span className="subtitle" dir="auto">
              {getVisibilityValue(privacy.voiceMessages)}
            </span>
          </div>
        </ListItem>
        <ListItem
          narrow
          rightElement={isCurrentUserPremium && <StarIcon size="big" type="premium" />}
          className="no-icon"
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => onScreenSelect(SettingsScreens.PrivacyMessages)}
        >
          <div className="multiline-menu-item">
            <span className="title">{lang('PrivacyMessagesTitle')}</span>
            <span className="subtitle" dir="auto">
              {shouldNewNonContactPeersRequirePremium
                ? lang('PrivacyMessagesContactsAndPremium')
                : lang('P2PEverybody')}
            </span>
          </div>
        </ListItem>
        <ListItem
          narrow
          className="no-icon"
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => onScreenSelect(SettingsScreens.PrivacyGroupChats)}
        >
          <div className="multiline-menu-item">
            <span className="title">{lang('WhoCanAddMe')}</span>
            <span className="subtitle" dir="auto">
              {getVisibilityValue(privacy.chatInvite)}
            </span>
          </div>
        </ListItem>
      </div>

      {canChangeSensitive && (
        <div className="settings-item">
          <h4 className="settings-item-header" dir={lang.isRtl ? 'rtl' : undefined}>
            {lang('lng_settings_sensitive_title')}
          </h4>
          <Checkbox
            label={lang('lng_settings_sensitive_disable_filtering')}
            subLabel={lang('lng_settings_sensitive_about')}
            checked={Boolean(isSensitiveEnabled)}
            disabled={!canChangeSensitive}
            onCheck={handleUpdateContentSettings}
          />
        </div>
      )}

      {canDisplayAutoarchiveSetting && (
        <div className="settings-item">
          <h4 className="settings-item-header" dir={lang.isRtl ? 'rtl' : undefined}>
            {lang('NewChatsFromNonContacts')}
          </h4>
          <Checkbox
            label={lang('ArchiveAndMute')}
            subLabel={lang('ArchiveAndMuteInfo')}
            checked={Boolean(shouldArchiveAndMuteNewNonContact)}
            onCheck={handleArchiveAndMuteChange}
          />
        </div>
      )}

      <div className="settings-item">
        <h4 className="settings-item-header" dir={lang.isRtl ? 'rtl' : undefined}>
          {lang('lng_settings_window_system')}
        </h4>
        <Checkbox
          label={lang('lng_settings_title_chat_name')}
          checked={Boolean(canDisplayChatInTitle)}
          onCheck={handleChatInTitleChange}
        />
      </div>
    </div>
  );
};

export default memo(withGlobal<OwnProps>(
  (global): StateProps => {
    const {
      settings: {
        byKey: {
          hasPassword, isSensitiveEnabled, canChangeSensitive, shouldArchiveAndMuteNewNonContact,
          canDisplayChatInTitle, shouldNewNonContactPeersRequirePremium,
        },
        privacy,
      },
      blocked,
      passcode: {
        hasPasscode,
      },
      appConfig,
    } = global;

    return {
      isCurrentUserPremium: selectIsCurrentUserPremium(global),
      hasPassword,
      hasPasscode: Boolean(hasPasscode),
      blockedCount: blocked.totalCount,
      webAuthCount: global.activeWebSessions.orderedHashes.length,
      isSensitiveEnabled,
      canDisplayAutoarchiveSetting: Boolean(appConfig?.canDisplayAutoarchiveSetting),
      shouldArchiveAndMuteNewNonContact,
      canChangeSensitive,
      shouldNewNonContactPeersRequirePremium,
      privacy,
      canDisplayChatInTitle,
      canSetPasscode: selectCanSetPasscode(global),
    };
  },
)(SettingsPrivacy));
