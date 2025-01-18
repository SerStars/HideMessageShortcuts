// Created by mafu, modified by SerStars
import {FormRow, FormSection, FormSwitch, ScrollView, Text} from 'enmity/components'
import {Constants, React, StyleSheet, Dialog} from 'enmity/metro/common'
import {Linking} from "enmity/metro/common"
// @ts-ignore
import {version} from '../../manifest.json'
import {getIDByName} from "enmity/api/assets"

const GitHubIcon = getIDByName('img_account_sync_github_white')
const ReactionIcon = getIDByName('ReactionIcon')
const ReplyIcon = getIDByName('ic_reply_24px')
const ForwardIcon = getIDByName('ic_forward_24px')
const ThreadIcon = getIDByName('ThreadPlusIcon')

export default ({settings}) => {
   const styles = StyleSheet.createThemedStyleSheet({
      footer: {
         color: Constants.ThemeColorMap.HEADER_SECONDARY,
         textAlign: 'center',
         paddingTop: 10,
         paddingBottom: 20
      }
   })
   return (
   <ScrollView>
      <FormSection title="HIDE BUTTONS">
         <FormRow
         label="Disable Forward"
         subLabel="Hide the Forward Message shortcut"
         leading={<FormRow.Icon source={ForwardIcon}/>}
         trailing={
      <FormSwitch
         value={settings.getBoolean("hideForward", true)}
         onValueChange={(value) => {
            settings.set("hideForward", value)
         }}
            />
         }
      />
      <FormRow
         label="Disable Reply"
         subLabel="Hide the Reply shortcut"
         leading={<FormRow.Icon source={ReplyIcon}/>}
         trailing={
      <FormSwitch
         value={settings.getBoolean("hideReply", true)}
         onValueChange={(value) => {
            settings.set("hideReply", value)
         }}
            />
         }
      />
      <FormRow
         label="Disable Reaction"
         subLabel="Hide the Add Reaction shortcut"
         leading={<FormRow.Icon source={ReactionIcon}/>}
         trailing={
      <FormSwitch
         value={settings.getBoolean("hideReaction", true)}
         onValueChange={(value) => {
            settings.set("hideReaction", value)
         }}
            />
         }
      />
      <FormRow
         label="Disable Create Thread"
         subLabel="Hide the Create Thread shortcut"
         leading={<FormRow.Icon source={ThreadIcon}/>}
         trailing={
      <FormSwitch
         value={settings.getBoolean("hideThread", true)}
         onValueChange={(value) => {
            settings.set("hideThread", value)
         }}
            />
         }
      />
      </FormSection>
      <FormSection title="INFORMATION">
         <FormRow
         label="Check the Source Code on GitHub"
         trailing={FormRow.Arrow}
         leading={<FormRow.Icon source={GitHubIcon}/>}
         onPress={() => {
         Linking.openURL("https://github.com/SerStars/HideMessageShortcuts")
         }}/>
      </FormSection>
         <Text style={styles.footer}>{`v${version}`}</Text>
      </ScrollView>
   )
};