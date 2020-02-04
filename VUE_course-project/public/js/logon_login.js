const Logon = {
    template: 
        `<v-card>
            <v-card-title>
                <span class="headline">Регистрация</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Имя*" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Отчество"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                label="Фамилия*"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field 
                                label="Email*" 
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field 
                                label="Пароль*" 
                                type="password" 
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select
                                :items="['0-17', '18-29', '30-54', '54+']"
                                label="Возраст*"
                                required
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-container>
                <small>*Обязательная информация</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn v-on:click="submitForm" color="green" outlined>Регистрация</v-btn>
            </v-card-actions>
        </v-card>`,
    methods: {
        submitForm: function () {
            alert("Регистрация завершена");
        }
    }
}

const Login = {
    template: 
        `<v-card
            class="mx-auto"
            max-width="400"
        >
            <v-card-title>
                <span class="headline">Вход</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field 
                                label="Email*" 
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field 
                                label="Пароль*" 
                                type="password" 
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <small>*Обязательная информация</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn v-on:click="submitForm" color="green" outlined>Вход</v-btn>
            </v-card-actions>
        </v-card>`,
    methods: {
        submitForm: function () {
            alert("Вход выполнен");
        }
    }
}