import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { create } from 'enmity/patcher';
import { React } from 'enmity/metro/common';
import { getByProps } from 'enmity/metro';
import { get } from "enmity/api/settings";

const canForward = getByProps("canShowForwardShortcut");
const canReply = getByProps("canShowReplyShortcut");
const canReact = getByProps("canShowReactionShortcut");
const canThread = getByProps("canShowThreadShortcut");

import manifest, { name as plugin_name } from '../manifest.json'
import Settings from "./components/Settings"
const Patcher = create('HideMessageShortcuts');

const HideMessageShortcuts: Plugin = {
   ...manifest,

   onStart() {
      if (get(plugin_name, "hideForward", true)) {
         if (canForward && typeof canForward.canShowForwardShortcut === 'function') {
            Patcher.instead(canForward, 'canShowForwardShortcut', () => false);
         }
      }

      if (get(plugin_name, "hideReply", true)) {
         if (canReply && typeof canReply.canShowReplyShortcut === 'function') {
            Patcher.instead(canReply, 'canShowReplyShortcut', () => false);
         }
      }

      if (get(plugin_name, "hideReaction", true)) {
         if (canReact && typeof canReact.canShowReactionShortcut === 'function') {
            Patcher.instead(canReact, 'canShowReactionShortcut', () => false);
         }
      }

      if (get(plugin_name, "hideThread", true)) {
         if (canThread && typeof canThread.canShowThreadShortcut === 'function') {
            Patcher.instead(canThread, 'canShowThreadShortcut', () => false);
         }
      }
   },

   onStop() {
      Patcher.unpatchAll();
   },

   getSettingsPanel({ settings }) {
      return <Settings settings={settings} />;
   }
};

registerPlugin(HideMessageShortcuts);
