<template>
  <div style="height: 100%; user-select: none; cursor: default;">

    <div class="credits">
      <div class="col">
        <h1><span>free</span>BPMN</h1>
        <p>O Free BPMN é uma iniciativa de <a href="#" @click="openSite($event)">Daniel Bonifacio</a> para incentivar o uso da modelagem de processos com a notação universal BPMN.</p>
        <p>A proposta do projeto é oferecer um software livre (gratuito) que permita o usuário a utilizar todos os recursos da notação, sem nenhum limite ou valor embutido. </p>
        <p>Todo o código utilizado aqui pode ser encontrado no GihHub oficial do criador. Você pode contribuir com um Pull Request.</p>
        <Logo width="100px"/>
      </div>
      <div class="col">
        <div>
          <img
            class="profilePicture"
            :src="avatar">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from './Logo';
const { shell } = require('electron').remote;

export default {
  components: {
    Logo,
  },
  data: () => ({
    avatar: 'https://gravatar.com/avatar/1419a379c561c42cbdd9e82d064363a6?s=200',
  }),
  methods: {
    openSite(e) {
      e.preventDefault();
      shell.openExternal('https://danielbonifacio.com.br/');
    },
  },
};
</script>

<style scoped lang="scss">

  .credits {
    max-width: 960px;
    margin: auto;
    display: flex;

    .col {
      padding: 0 20px;
    }

    h1 {
      font-weight: 700;
      text-transform: uppercase;
      font-size: 1.6em;
      color: #424242;

      span {
        font-size: .9em;
        text-transform: lowercase;
        font-weight: 300;
      }

      &::after {
        content: '';
        display: block;

        height: 4px;
        width: 60px;
        margin: 5px 0 20px;
        background-color: #424242;
      }
    }

    .col:nth-child(2) {
      width: 30%;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      img {
        width: 140px;
        height: 140px;
        border-radius: 10px;
        margin: auto;
        box-shadow: 0 3px 10px rgba(#424242, .4);
      }
    }
  }
  img {
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
</style>