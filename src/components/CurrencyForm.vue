<template>
  <form name="form" id="form" class="form" @submit.prevent="sendForm">
    <div class='currency-box'>
      <span class="label">Введите необходимую сумму </span>
      <input type="number" name="money" id="money" class="money" placeholder="Введите сумму" v-model="money" @input="sendForm">
    </div>
    <div class="currency-box">
      <span class="label">Выберите валюту для конвертации</span>
      <select name="currentMoney" id="currentMoney" class="currency current-money" v-model="forchange" @change="sendForm">
        <option :value="setLocal" selected>{{ setLocal }}</option>
        <option v-for="(cur, i) in currencies" :key="cur[i]" :value="cur">{{cur}}</option>
      </select>
    </div>
    <div class="currency-box">
      <span class="label">Выберите конечную валюту</span>
      <select name="exchangeMoney" id="exchangeMoney" class="currency" v-model="current" @change="sendForm">
        <option :value="setLocal" selected>{{ setLocal }}</option>
        <option v-for="(cur, i) in currencies" :key="cur[i]" :value="cur">{{cur}}</option>
      </select>

    </div>
  </form>
</template>

<script>

export default {
  //загрузка данных с API, записываем в store
  async beforeMount() {
      await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
          .then((res) => res.json())
          .then((data) => {this.$store.dispatch("setCurrencies", data)})
  },

  data(){
    return{
        money: '',
        current: '',
        forchange: ''
    }
  },
  computed:{
    //список возможных конверсий (для отрисовки)
    currencies(){
      let currency = []
      let cur = this.$store.state.currencies.Valute
      for (let key in cur){
        currency.push(key)
      }
      return currency
    },
    setLocal(){
      let local = ''
      //Определим локаль браузера
      let userLang = navigator.language || navigator.userLanguage;
      switch (userLang){
        case 'ru':
          local = 'RUB';
          break;
        case 'en':
          local = 'GBP';
          break;
        default:
          local = 'USD';
      }
      console.log(local)
      this.$store.commit('setLocal', local)
      return local;
    }
  },
  methods:{
    //отправка формы - отправляем значения в store
    sendForm(){
      this.$store.commit('setMoney', this.money)
      let valute = this.$store.getters['getCurrencies']['Valute']
      if (this.current === 'RUB'){
        this.$store.commit('setCurrency', 1)
      } else {
        for (let key in valute){
          if(key === this.current){
            this.$store.commit('setCurrency', valute[key])
          }
          if(key === this.forchange){
            this.$store.commit('setForchange', valute[key])
          }
        }
      }
      if (this.forchange === 'RUB'){
          this.$store.commit('setForchange', 1)
          this.$store.commit('setMoney', this.money)
        } else {
          for (let key in valute){
            if(key === this.current){
              this.$store.commit('setCurrency', valute[key])
              this.$store.commit('setMoney', this.money)
            }
            if(key === this.forchange){
              this.$store.commit('setForchange', valute[key])
            }
          }
      }

    },


  }
}

</script>

<style lang="scss">
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none; // Yeah, yeah everybody write about it
}

input[type='number'],
input[type="number"]:hover,
input[type="number"]:focus {
  appearance: none;
  -moz-appearance: textfield;
}
.form{
  display: flex;
  justify-content: center;
  align-items: start;
  margin-top: 40px;
  margin-bottom: 40px;
}
.invalid{
  border: 1px solid red!important;
  border-radius: 12px;
}
small{
  color: red;
}

.currency-box{
  display: flex;
  flex-direction: column;
  justify-content: start;
  min-height: 100px;
  margin: 10px;
  text-align: center;
}
.label{
  font-size: 12px;
  text-align: center;
  margin-bottom: 5px;
  width: 200px;
  height: 30px;
}

.money{
  display: block;
  width: 200px;
  padding: 11px 20px;
  border-radius: 12px;
  margin-right: 15px;
  border: 1px solid black;
  &:focus {
    outline: none;
  }
}
.currency{
  padding: 10px;
  border-radius: 12px;
  &:focus{
    outline: none;
  }

}
.current-money{
  display: block;
  border: 1px solid black;
  font-size: 12px;
}

@media (max-width: 780px) {
  .form{
    flex-direction: column;
  }
  .money{
    margin-bottom: 20px;
    margin-right: 0;
    width: 100%;
  }
  .currency-box{
    width: 100%;
  }
  .currency {
    margin-bottom: 20px;
    margin-right: 0;
    width: 100%;
  }
  .label{
    width: 100%;
  }
}

</style>