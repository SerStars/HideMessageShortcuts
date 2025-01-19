import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { create } from 'enmity/patcher';
import { React } from 'enmity/metro/common';
import { getByProps } from 'enmity/metro';
import { get } from "enmity/api/settings";

import manifest, { name as plugin_name } from '../manifest.json'
import Settings from "./components/Settings"
const Patcher = create('HideMessageShortcuts');

const HideMessageShortcuts: Plugin = {
   ...manifest,

   onStart() {
      const shortcuts = getByProps('isInMessageShortcutsExperiment');
      const shortcutsToPatch = {
         canShowForwardShortcut: get(plugin_name, "hideForward", true),
         canShowReplyShortcut: get(plugin_name, "hideReply", true),
         canShowReactionShortcut: get(plugin_name, "hideReaction", true),
         canShowThreadShortcut: get(plugin_name, "hideThread", true)
      };

      Object.entries(shortcutsToPatch).forEach(([property, shouldHide]) => {
         if (shouldHide && typeof shortcuts[property] === 'function') {
            Patcher.instead(shortcuts, property, () => false);
         }
      });
   },

   onStop() {
      Patcher.unpatchAll();
   },

   getSettingsPanel({ settings }) {
      return <Settings settings={settings} />;
   }
};

registerPlugin(HideMessageShortcuts);
