function mySettings(props) {
  return (
    <Page>
       <Section>
         
           <Toggle
             settingsKey="display"
             label="Display Always On"
            />   
         
            <Text italic align="left">Note: When the display is always on, battery life will be impacted. Press any button to turn the screen off/on.</Text>
                     
            <Toggle
             settingsKey="stats"
             label="Show date and health info"
            />
             <Text italic align="left">Activate this button to enable TAP to show stats</Text>

             <Toggle
             settingsKey="battery"
             label="Show Battery"
            /> 
         
        <Text>Time colour (foreground)</Text>
        <ColorSelect
          settingsKey="color"
          colors={[
            {color: "#444444"},  // dkgrey
            {color: "#999999"},  // midgrey
            {color: "#ffffff"},  // white
            {color: "#ffff00"},  // yellow
            {color: "#ffd700"},  // gold              
            {color: "#FF8C00"},  // darkorange
            {color: "#FF4500"},  // orangered
            {color: "#FF0000"},  // red
            {color: "#800000"},  // maroon
            {color: "#ffbfbf"},  // vertlightred
            {color: "#FF00FF"},  // pink
            {color: "#5a00ff"},  // purple
            {color: "#d1b8ff"},  // purple
            {color: "#c2f6ff"},  // verylightblue
            {color: "#00FFFF"},  // cyan
            {color: "#00BFFF"},  // deepskyblue
            {color: "#0000FF"},  // blue
            {color: "#007000"},  // darkgreen
            {color: "#00ff00"},  // yellowgreen
            {color: "#a4fe4d"},  // lightgreen
            {color: "#dafcaf"},  // verylightgreen
          ]}
        />
         
        <Text>Time colour (background) and box borders</Text>
        <ColorSelect
          settingsKey="color1"
          colors={[
            {color: "#444444"},  // dkgrey
            {color: "#999999"},  // midgrey
            {color: "#ffffff"},  // white
            {color: "#ffff00"},  // yellow
            {color: "#ffd700"},  // gold              
            {color: "#FFA500"},  // orange
            {color: "#FF0000"},  // red
            {color: "#800000"},  // maroon
            {color: "#ffbfbf"},  // vertlightred
            {color: "#FF00FF"},  // pink
            {color: "#5a00ff"},  // purple
            {color: "#9b64ff"},  // purple
            {color: "#d1b8ff"},  // purple
            {color: "#c2f6ff"},  // verylightblue
            {color: "#00FFFF"},  // cyan
            {color: "#00BFFF"},  // deepskyblue
            {color: "#0000FF"},  // blue
            {color: "#007000"},  // darkgreen
            {color: "#00ff00"},  // yellowgreen
            {color: "#a4fe4d"},  // lightgreen
            {color: "#dafcaf"},  // verylightgreen
          ]}
        />
       
        <Text>Date and health info colour</Text>
          <ColorSelect
          settingsKey="color2"
          colors={[
            {color: "#444444"},  // dkgrey
            {color: "#999999"},  // midgrey
            {color: "#ffffff"},  // white
            {color: "#ffff00"},  // yellow
            {color: "#ffd700"},  // gold              
            {color: "#FFA500"},  // orange
            {color: "#FF0000"},  // red
            {color: "#800000"},  // maroon
            {color: "#ffbfbf"},  // vertlightred
            {color: "#FF00FF"},  // pink
            {color: "#5a00ff"},  // purple
            {color: "#9b64ff"},  // purple
            {color: "#d1b8ff"},  // purple
            {color: "#c2f6ff"},  // verylightblue
            {color: "#00FFFF"},  // cyan
            {color: "#00BFFF"},  // deepskyblue
            {color: "#0000FF"},  // blue
            {color: "#007000"},  // darkgreen
            {color: "#00ff00"},  // yellowgreen
            {color: "#a4fe4d"},  // lightgreen
            {color: "#dafcaf"},  // verylightgreen
          ]}
        />
         
 
      </Section>

             <Section title={<Text bold align="center">Time Format</Text>}>
              
                <Text>Your time format (12/24hrs) is set via your fitbit web profile page here,  <Link source="https://www.fitbit.com/settings/profile">Fitbit Profile</Link>. Please Note, you should re-sync your watch after changing a profile setting.</Text>
      
            </Section>
      
                <Text>For more of my watchfaces visit,  <Link source="https://www.chopsfitbitfaces.com/">chopsfitbitfaces</Link></Text>
                <Text>Thankyou. Enjoy!</Text>
    </Page>
  );
}
registerSettingsPage(mySettings);