window.products = [{
        'id': 1,
        'title': 'Фикус бонсай «В стильной плошке»',
        'description': 'Фикус Баньян – это символ вечной жизни, устойчивости и несгибаемости.',
        'height': '30 см',
        'age': '12 лет',
        'price': 4000,
        'image': 'https://xn--80abzoet.xn--p1ai/upload/iblock/5d3/fikus3500.jpg',
        'avalibleInventory': 5,
        'rating': 3
    },
    {
        'id': 2,
        'title': 'Коллекционный можжевельник авторской работы',
        'description': 'Вечнозеленое хвойное дерево с мелкой хвоей. Это растение издавна используется для формирования бонсай. Он быстро растет, дает множество боковых побегов, практически не поражается вредителями и может зимовать при комнатной температуре.',
        'height': '40 см',
        'age': '25 лет',
        'price': 35000,
        'image': 'https://xn--80abzoet.xn--p1ai/upload/iblock/691/mojevelnik-bonsai.jpg',
        'avalibleInventory': 1,
        'rating': 5
    },
    {
        'id': 3,
        'title': 'Фикус ретуза',
        'description': 'Вечнозеленое дерево, в природе до 20 м высотой, с толстым гладким стволом и широко разветвленной кроной. Это известное и распространенное комнатное растение – прекрасный материал для выращивания в виде бонсай, по силам даже начинающим.',
        'height': '40 см',
        'age': '15 лет',
        'price': 10000,
        'image': 'https://xn--80abzoet.xn--p1ai/upload/iblock/6ca/ficus_2.jpg',
        'avalibleInventory': 3,
        'rating': 4
    }
];


const Product = {
    template: `<v-col cols="12" sm="4">
        <v-card
            class="mx-auto"
            max-width="400"
        >
            <v-img
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="400px"
                v-bind:src="product.image"
            >
                <v-card-title
                    v-text="product.title"
                    style="word-break: normal;"
                    >
                </v-card-title>
            </v-img>

            <div>
                <v-card-text>
                    <v-row align="center" class="mx-0">
                        <v-rating
                            dense
                            v-model="product.rating"
                            background-color="orange lighten-3"
                            color="orange"
                            readonly
                        ></v-rating>
                        <v-spacer></v-spacer>
                        <div class="grey--text mr-2 title">{{product.price | formatPrice}}</div>
                    </v-row>
                </v-card-text>
            </div>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn
                    v-on:click="addToCart(product)" 
                    v-if="canAddToCart(product)"
                    outlined
                    color="green"
                >Купить</v-btn>
                <v-btn v-else 
                    disabled
                    outlined
                    color="green"
                >Купить</v-btn>
                <v-spacer></v-spacer>
                <v-btn link :to="{name:'productcard', params:{id:product.id}}"
                    color="green"
                    outlined
                >Подробнее</v-btn>
            </v-card-actions>
        </v-card>
    </v-col>`,
    props: ['product'],
    computed: {
        ...Vuex.mapState(['products', 'cart'])
    },
    methods: {
        addToCart: function (product) {
            this.$store.commit('addToCart', product.id);
        },
        canAddToCart: function (product) {
            return product.avalibleInventory > this.cartCountFn(product.id);
        },
        cartCountFn: function (id) {
            let itemCount = 0;

            for (let i = 0; i < this.cart.length; i++)
                if (this.cart[i] === id)
                    itemCount++;

            return itemCount;
        }
    },
    filters: {
        formatPrice: function (val) {
            if (!parseInt(val)) return '';
            let arr = val.toString().split("");
            let index = 3;
            while (arr.length > index) {
                arr.splice(arr.length - index, 0, " ");
                index += 4;
            }
            return arr.join("") + ' ' + String.fromCharCode(8381);
        }
    }
};

const Products = {
    template: `<v-row>
        <product 
            v-for="product in sortedProducts"
            :product="product"
            :key="product.id"
        ></product>                
    </v-row>`,
    computed: {
        ...Vuex.mapState(['products']),
        sortedProducts: function () {
            if (this.products.length > 0) {
                let productsArray = this.products.slice(0);

                function compare(a, b) {
                    let titleA = a.title.toLowerCase(),
                        titleB = b.title.toLowerCase()
                    if (titleA > titleB)
                        return 1;
                    if (titleA < titleB) {
                        return -1;
                    }
                    return 0;
                }

                return productsArray.sort(compare);
            }
        }
    },
    components: {
        'product': Product
    }
};


const ProductCard = {
    template: `<v-row>
                    <v-col cols="12" md="5" class="d-flex justify-center">
                        <v-img class="flex-grow-0 elevation-2"
                            v-bind:src="product.image"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            width="350"
                            height="400"
                        >                        
                        </v-img>
                    </v-col>
                    <v-col cols="12" md="7">
                        <h1 class="ma-2" v-text="product.title"></h1>
                        <v-rating
                            dense
                            v-model="product.rating"
                            background-color="orange lighten-3"
                            color="orange"                                        
                            readonly
                            class="ma-2"
                        ></v-rating>
                        <p class="ma-2" v-html="product.description"><p>
                        <p class="ma-2">Высота: {{product.height}}</p>
                        <p class="ma-2">Возраст: {{product.age}}<p>
                        <p class="ma-2">Стоимость: {{product.price | formatPrice}}</p>
                        <v-btn 
                            v-on:click="addToCart(product)" 
                            v-if="canAddToCart(product)"
                            class="ma-2" outlined 
                            color="green"
                        >Добавить в корзину</v-btn>
                        <v-btn v-else 
                            disabled
                            class="ma-2" outlined 
                            color="green"
                        >Добавить в корзину</v-btn> 
                        <transition name="bounce" mode="out-in">
                            <span class="inline-block" v-if="product.avalibleInventory - cartCountFn(product.id) === 0" key="1">Нет в наличии</span>
                            <span class="inline-block" v-else-if="product.avalibleInventory - cartCountFn(product.id) < 5" key="">Осталось только {{product.avalibleInventory - cartCountFn(product.id)}}</span>
                            <span class="inline-block" v-else key="">Осталось много</span>
                        </transition>
                        
                    </v-col>
                </v-row>`,
    props: ['id'],
    computed: {
        ...Vuex.mapState(['products', 'cart']),
        product: function () {
            let id = this.id;
            let arr = this.products.filter(function (prod) {
                return prod.id === id;
            });
            return arr[0];
        },

    },
    methods: {
        addToCart: function (product) {
            this.$store.commit('addToCart', product.id);
        },
        canAddToCart: function (product) {
            return product.avalibleInventory > this.cartCountFn(product.id);
        },
        cartCountFn: function (id) {
            let itemCount = 0;

            for (let i = 0; i < this.cart.length; i++)
                if (this.cart[i] === id)
                    itemCount++;

            return itemCount;
        }
    },
    filters: {
        formatPrice: function (val) {
            if (!parseInt(val)) return '';
            let arr = val.toString().split("");
            let index = 3;
            while (arr.length > index) {
                arr.splice(arr.length - index, 0, " ");
                index += 4;
            }
            return arr.join("") + ' ' + String.fromCharCode(8381);
        }
    }
}

const CheckoutForm = {
    template: `<v-card>
                    <v-card-title>
                        <h2>Оформление заказа</h2>
                    </v-card-title>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field label="Имя:" v-model.trim="order.firstname"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field label="Фамилия:" v-model.trim="order.lastname"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field label="Адрес:" v-model.trim="order.address"></v-text-field>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="4">
                                <v-radio-group v-model="order.type_address" row>
                                    <v-radio label="Дом" value="домашний адрес"></v-radio>
                                    <v-radio label="Работа" value="рабочий адрес"></v-radio>
                                </v-radio-group>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field label="Город:" v-model.trim="order.city"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-select label="Страна:" v-model.trim="order.country" :items="order.countries"></v-select>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field label="Почтовый индекс:" v-model.number="order.zip"></v-text-field>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="4">
                                <v-checkbox label="Подарочная упаковка" v-model="order.gift" true-value="да" false-value="нет"></v-checkbox>                        
                            </v-col>
                            <v-col cols="12">
                                <p>Имя: {{order.firstname}}</p>
                                <p>Фамилия: {{order.lastname}}</p>
                                <p>Адрес: {{order.address}}</p>
                                <p>Город: {{order.city}}</p>
                                <p>Страна: {{order.country}}</p>
                                <p>Почтовый индекс: {{order.zip}}</p>
                                <p>Подарочная упаковка: {{order.gift}}</p>
                                <p>Тип адрес: {{order.type_address}}</p>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn 
                            v-on:click="submitForm" 
                            class="ma-2" outlined 
                            color="green"
                        >Заказать</v-btn>                       
                    </v-card-actions>
                </v-card>`,
    data: function () {
        return {
            order: {
                firstname: '',
                lastname: '',
                address: '',
                city: '',
                country: '',
                gift: 'нет',
                type_address: 'домашний адрес',
                countries: ['Россия', 'Белоруссия', 'Казахстан']
            }
        };
    },
    methods: {
        submitForm: function () {
            alert("Заказ оформлен");
        }
    }
}