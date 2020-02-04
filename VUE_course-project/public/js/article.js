const Home = {
    template: 
        `<v-col cols="12">
            <v-card
                class="mx-auto"
                width="1200"
            >
            <v-img
                class="white--text align-end"
                height="250px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
                <v-card-title>Top 10 Australian beaches</v-card-title>
            </v-img>
        
            <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>
        
            <v-card-text class="text--primary">
                <div>Whitehaven Beach</div>
        
                <div>Whitsunday Island, Whitsunday Islands</div>
            </v-card-text>
            
            <v-expansion-panels focusable>
                <v-expansion-panel
                  v-for="(item,i) in 1"
                  :key="i"
                >
                    <v-expansion-panel-header>Далее</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
            </v-card>
        </v-col>`
    
}
   
