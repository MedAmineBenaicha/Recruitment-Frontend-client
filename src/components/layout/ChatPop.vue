<template>
  <!-- Chat message button -->
  <div
    class="chat-logo-container d-flex justify-content-center align-items-center chat_on"
  >
    <i class="fas fa-comment-alt d-inline-block"></i>
  </div>
  <!-- Chat Container -->
  <div id="Smallchat">
    <div
      class="Layout Layout-open Layout-expand Layout-right"
      style="background-color: #3F51B5;color: rgb(255, 255, 255);opacity: 5;border-radius: 10px;"
    >
      <div class="Messenger_messenger">
        <div class="Messenger_header messenger-header px-3">
          <h4 class="Messenger_prompt px-3">
            How can we help you?
          </h4>
          <span class="chat_close_icon" @click="showPopUp"
            ><i class="fa fa-window-close" aria-hidden="true"></i
          ></span>
        </div>
        <div class="Messenger_content">
          <div class="Messages">
            <div class="Messages_list">
              <!-- List of messages -->
              <message-item :messages="messages"></message-item>
            </div>
          </div>
          <div class="Input Input-blank">
            <textarea
              class="Input_field"
              placeholder="Send a message..."
              style="height: 20px;"
              @keydown.enter.prevent="sendMessage"
              v-model="message"
            ></textarea>
            <button class="Input_button Input_button-emoji">
              <div class="Icon" style="width: 18px; height: 18px;">
                <svg
                  width="56px"
                  height="56px"
                  viewBox="1332 47 56 56"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  style="width: 18px; height: 18px;"
                >
                  <g
                    id="emoji"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                    transform="translate(1332.000000, 47.000000)"
                  >
                    <path
                      d="M28,56 C12.536027,56 0,43.463973 0,28 C0,12.536027 12.536027,0 28,0 C43.463973,0 56,12.536027 56,28 C56,43.463973 43.463973,56 28,56 Z M28,50 C40.1502645,50 50,40.1502645 50,28 C50,15.8497355 40.1502645,6 28,6 C15.8497355,6 6,15.8497355 6,28 C6,40.1502645 15.8497355,50 28,50 Z"
                      id="Oval-8"
                      fill="#96AAB4"
                      fill-rule="nonzero"
                    ></path>
                    <path
                      d="M28,47 C18.0588745,47 10,38.9411255 10,29 C10,27.5224898 11.5469487,26.5550499 12.8754068,27.2017612 C13.0116063,27.2662365 13.0926181,27.3037345 13.1866998,27.3464814 C13.4611235,27.4711684 13.7819537,27.6111958 14.1451774,27.7627577 C15.1908595,28.199088 16.3591406,28.6365764 17.6173846,29.0449298 C21.1841638,30.2025005 24.7379224,30.8945075 28,30.8945075 C31.2620776,30.8945075 34.8158362,30.2025005 38.3826154,29.0449298 C39.6408594,28.6365764 40.8091405,28.199088 41.8548226,27.7627577 C42.2180463,27.6111958 42.5388765,27.4711684 42.8133002,27.3464814 C42.9073819,27.3037345 42.9883937,27.2662365 43.0558366,27.2344634 C44.4530513,26.5550499 46,27.5224898 46,29 C46,38.9411255 37.9411255,47 28,47 Z M28,43 C34.6510529,43 40.2188483,38.3620234 41.6456177,32.1438387 C40.9980758,32.3847069 40.320642,32.6213409 39.6173846,32.8495777 C35.6841638,34.1260741 31.7379224,34.8945075 28,34.8945075 C24.2620776,34.8945075 20.3158362,34.1260741 16.3826154,32.8495777 C15.679358,32.6213409 15.0019242,32.3847069 14.3543823,32.1438387 C15.7811517,38.3620234 21.3489471,43 28,43 Z"
                      id="Oval-8"
                      fill="#96AAB4"
                      fill-rule="nonzero"
                    ></path>
                    <path
                      d="M19,15 L19,20 C19,21.1045695 19.8954305,22 21,22 C22.1045695,22 23,21.1045695 23,20 L23,15 C23,13.8954305 22.1045695,13 21,13 C19.8954305,13 19,13.8954305 19,15 Z"
                      id="Line"
                      fill="#96AAB4"
                      fill-rule="nonzero"
                    ></path>
                    <path
                      d="M32,15 L32,20 C32,21.1045695 32.8954305,22 34,22 C35.1045695,22 36,21.1045695 36,20 L36,15 C36,13.8954305 35.1045695,13 34,13 C32.8954305,13 32,13.8954305 32,15 Z"
                      id="Line-Copy-2"
                      fill="#96AAB4"
                      fill-rule="nonzero"
                    ></path>
                  </g>
                </svg>
              </div>
            </button>
            <button
              class="Input_button Input_button-send"
              @click.prevent="sendMessage"
            >
              <div class="Icon" style="width: 18px; height: 18px;">
                <svg
                  width="57px"
                  height="54px"
                  viewBox="1496 193 57 54"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  style="width: 18px; height: 18px;"
                >
                  <g
                    id="Group-9-Copy-3"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                    transform="translate(1523.000000, 220.000000) rotate(-270.000000) translate(-1523.000000, -220.000000) translate(1499.000000, 193.000000)"
                  >
                    <path
                      d="M5.42994667,44.5306122 L16.5955554,44.5306122 L21.049938,20.423658 C21.6518463,17.1661523 26.3121212,17.1441362 26.9447801,20.3958097 L31.6405465,44.5306122 L42.5313185,44.5306122 L23.9806326,7.0871633 L5.42994667,44.5306122 Z M22.0420732,48.0757124 C21.779222,49.4982538 20.5386331,50.5306122 19.0920112,50.5306122 L1.59009899,50.5306122 C-1.20169244,50.5306122 -2.87079654,47.7697069 -1.64625638,45.2980459 L20.8461928,-0.101616237 C22.1967178,-2.8275701 25.7710778,-2.81438868 27.1150723,-0.101616237 L49.6075215,45.2980459 C50.8414042,47.7885641 49.1422456,50.5306122 46.3613062,50.5306122 L29.1679835,50.5306122 C27.7320366,50.5306122 26.4974445,49.5130766 26.2232033,48.1035608 L24.0760553,37.0678766 L22.0420732,48.0757124 Z"
                      id="sendicon"
                      fill="#96AAB4"
                      fill-rule="nonzero"
                    ></path>
                  </g>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import MessageItem from "../base/MessageItem.vue";
export default {
  components: { MessageItem },
  data() {
    return {
      showChatPopUp: false,
      message: null,

      // Data Chat
      isLoadingRooms: false,
    };
  },
  watch: {
    currentRoom() {
      //console.log("teeest");
      //this.connect();
    },
  },
  computed: {
    client() {
      return this.$store.getters.getActifClient;
    },
    currentRoom() {
      return this.$store.getters.getCurrentRoom;
    },
    messages() {
      return this.$store.getters.getMessages;
    },
  },
  methods: {
    connect() {
      console.log("testt");
      this.getMessages();
      window.Echo.channel("chat1").listen("NewChatMessage", (e) => {
        console.log("lisssste");
        console.log(e);
        this.getMessages();
      });
    },
    connectMessages() {
      this.intervalid = setInterval(
        function() {
          if (this.client != null) {
            this.getMessages();
          } else {
            return;
          }
        }.bind(this),
        3000
      );
    },
    showPopUp() {
      this.showChatPopUp = !this.showChatPopUp;
    },
    getRooms() {
      this.isLoadingRooms = true;
      this.$store
        .dispatch("getRooms")
        .then(() => {
          this.isLoadingRooms = false;
          //this.getMessages();
        })
        .catch((error) => {
          this.isLoadingRooms = false;
          console.log(error.message);
        });
    },
    getMessages() {
      this.isLoadingMessages = true;
      this.$store
        .dispatch("getMessages", { room_id: 1 })
        .then(() => {
          this.isLoadingMessages = false;
          this.scrollToBottomWhenMessageIsReceived();
        })
        .catch((error) => {
          this.isLoadingMessages = false;
          console.log(error.message);
        });
    },
    sendMessage() {
      if (this.message == null) {
        return;
      }
      const message = new FormData();
      message.append("message", this.message);
      message.append("chat_room_id", this.currentRoom.id);
      message.append("client_id", this.client.id);
      this.$store
        .dispatch("sendMessage", {
          room_id: this.currentRoom.id,
          message: message,
        })
        .then(() => {
          this.message = null;
          this.getMessages();
        })
        .catch(() => {});
    },
    scrollToBottomWhenMessageIsReceived(){
      console.log('xxx');
      $(".Messages").stop().animate({ scrollTop: $(".Messages")[0].scrollHeight}, 1000);
    }
  },
  created() {
    console.log("getRooms");
    this.getRooms();
  },
  mounted() {
    this.connect();
    //this.connectMessages();
    $(document).ready(function() {
      $(".chat_on").click(function() {
        $(".Layout").toggle();
        $(".Messages").stop().animate({ scrollTop: $(".Messages")[0].scrollHeight}, 1000);
        $(".chat_on").hide(300);
        $(".chat_on").removeClass("d-flex");
      });

      $(".chat_close_icon").click(function() {
        $(".Layout").hide();
        $(".chat_on").show(300);
        $(".chat_on").addClass("d-flex");
      });
    });
  },
};
</script>

<style scoped>
.chat-logo-container,
.chat-container {
  background-color: #f75c6a;
  color: #fff;
  position: fixed;
  z-index: 2147483003;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #fb5f66;
  cursor: pointer;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.06), 0 2px 32px 0 rgba(0, 0, 0, 0.16);
  animation: intercom-lightweight-app-launcher 250ms ease;
}
.chat-logo-container i {
  font-size: 2rem;
}
.card {
  border-radius: 15px;
  max-width: 380px;
}
.card-header {
  background-color: #fb5f66;
}
.card-body {
  background-color: #fff;
}
.messenger-header {
  background-color: rgb(43, 168, 72);
  color: rgb(255, 255, 255);
}
/*===========================
     CHAT BOOT MESSENGER
   ===========================*/
#Smallchat .Messages,
#Smallchat .Messages_list {
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}
.chat_close_icon {
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  position: absolute;
  right: 12px;
  z-index: 9;
}
.chat_on {
  position: fixed;
  right: 15px;
  bottom: 20px;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  padding: 9px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;
  cursor: pointer;
  display: block;
}
.chat_on_icon {
  color: #fff;
  font-size: 25px;
  text-align: center;
}
/*
#Smallchat,#Smallchat * {
 box-sizing:border-box; 
 -webkit-font-smoothing:antialiased;
 -moz-osx-font-smoothing:grayscale;
 -webkit-tap-highlight-color:transparent
}
*/
#Smallchat .Layout {
  pointer-events: auto;
  box-sizing: content-box !important;
  z-index: 999999999;
  position: fixed;
  bottom: 20px;
  min-width: 50px;
  max-width: 300px;
  max-height: 30px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  border-radius: 50px;
  box-shadow: 5px 0 20px 5px rgba(0, 0, 0, 0.1);
  -webkit-animation: appear 0.15s cubic-bezier(0.25, 0.25, 0.5, 1.1);
  animation: appear 0.15s cubic-bezier(0.25, 0.25, 0.5, 1.1);
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  opacity: 0;
  -webkit-transition: right 0.1s cubic-bezier(0.25, 0.25, 0.5, 1),
    bottom 0.1s cubic-bezier(0.25, 0.25, 0.5, 1),
    min-width 0.2s cubic-bezier(0.25, 0.25, 0.5, 1),
    max-width 0.2s cubic-bezier(0.25, 0.25, 0.5, 1),
    min-height 0.2s cubic-bezier(0.25, 0.25, 0.5, 1),
    max-height 0.2s cubic-bezier(0.25, 0.25, 0.5, 1),
    border-radius 50ms cubic-bezier(0.25, 0.25, 0.5, 1) 0.15s,
    background-color 50ms cubic-bezier(0.25, 0.25, 0.5, 1) 0.15s,
    color 50ms cubic-bezier(0.25, 0.25, 0.5, 1) 0.15s;
  transition: right 0.1s cubic-bezier(0.25, 0.25, 0.5, 1),
    bottom 0.1s cubic-bezier(0.25, 0.25, 0.5, 1),
    min-width 0.2s cubic-bezier(0.25, 0.25, 0.5, 1),
    max-width 0.2s cubic-bezier(0.25, 0.25, 0.5, 1),
    min-height 0.2s cubic-bezier(0.25, 0.25, 0.5, 1),
    max-height 0.2s cubic-bezier(0.25, 0.25, 0.5, 1),
    border-radius 50ms cubic-bezier(0.25, 0.25, 0.5, 1) 0.15s,
    background-color 50ms cubic-bezier(0.25, 0.25, 0.5, 1) 0.15s,
    color 50ms cubic-bezier(0.25, 0.25, 0.5, 1) 0.15s;
}

#Smallchat .Layout-right {
  right: 20px;
}

#Smallchat .Layout-open {
  overflow: hidden;
  min-width: 340px;
  max-width: 300px;
  height: 500px;
  max-height: 500px;
  border-radius: 10px;
  color: #fff;
  -webkit-transition: right 0.1s cubic-bezier(0.25, 0.25, 0.5, 1),
    bottom 0.1s cubic-bezier(0.25, 0.25, 0.5, 1.1),
    min-width 0.2s cubic-bezier(0.25, 0.25, 0.5, 1.1),
    max-width 0.2s cubic-bezier(0.25, 0.25, 0.5, 1.1),
    max-height 0.2s cubic-bezier(0.25, 0.25, 0.5, 1.1),
    min-height 0.2s cubic-bezier(0.25, 0.25, 0.5, 1.1),
    border-radius 0ms cubic-bezier(0.25, 0.25, 0.5, 1.1),
    background-color 0ms cubic-bezier(0.25, 0.25, 0.5, 1.1),
    color 0ms cubic-bezier(0.25, 0.25, 0.5, 1.1);
  transition: right 0.1s cubic-bezier(0.25, 0.25, 0.5, 1),
    bottom 0.1s cubic-bezier(0.25, 0.25, 0.5, 1.1),
    min-width 0.2s cubic-bezier(0.25, 0.25, 0.5, 1.1),
    max-width 0.2s cubic-bezier(0.25, 0.25, 0.5, 1.1),
    max-height 0.2s cubic-bezier(0.25, 0.25, 0.5, 1.1),
    min-height 0.2s cubic-bezier(0.25, 0.25, 0.5, 1.1),
    border-radius 0ms cubic-bezier(0.25, 0.25, 0.5, 1.1),
    background-color 0ms cubic-bezier(0.25, 0.25, 0.5, 1.1),
    color 0ms cubic-bezier(0.25, 0.25, 0.5, 1.1);
}

#Smallchat .Layout-expand {
  height: 500px;
  min-height: 500px;
  display: none;
}
#Smallchat .Layout-mobile {
  bottom: 10px;
}
#Smallchat .Layout-mobile.Layout-open {
  width: calc(100% - 20px);
  min-width: calc(100% - 20px);
}
#Smallchat .Layout-mobile.Layout-expand {
  bottom: 0;
  height: 100%;
  min-height: 100%;
  width: 100%;
  min-width: 100%;
  border-radius: 0 !important;
}
@-webkit-keyframes appear {
  0% {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  to {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes appear {
  0% {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  to {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
#Smallchat .Messenger_messenger {
  position: relative;
  height: 100%;
  width: 100%;
  min-width: 300px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}
#Smallchat .Messenger_header,
#Smallchat .Messenger_messenger {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}
#Smallchat .Messenger_header {
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 40px;
  height: 55px;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}

#Smallchat .Messenger_header h4 {
  opacity: 0;
  font-size: 19px;
  font-weight: 550;
  -webkit-animation: slidein 0.15s 0.3s;
  animation: slidein 0.15s 0.3s;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}

#Smallchat .Messenger_prompt {
  margin: 0;
  font-size: 16px;
  line-height: 18px;
  font-weight: 400;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

@-webkit-keyframes slidein {
  0% {
    opacity: 0;
    -webkit-transform: translateX(10px);
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}
@keyframes slidein {
  0% {
    opacity: 0;
    -webkit-transform: translateX(10px);
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}
#Smallchat .Messenger_content {
  height: 450px;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  background-color: #fff;
}
#Smallchat .Messages {
  position: relative;
  -webkit-flex-shrink: 1;
  -ms-flex-negative: 1;
  flex-shrink: 1;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px;
  background-color: #fff;
  -webkit-overflow-scrolling: touch;
}

#Smallchat .Input {
  position: relative;
  width: 100%;
  -webkit-box-flex: 0;
  -webkit-flex-grow: 0;
  -ms-flex-positive: 0;
  flex-grow: 0;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  padding-top: 17px;
  padding-bottom: 15px;
  color: #96aab4;
  background-color: #fff;
  border-top: 1px solid #e6ebea;
}
#Smallchat .Input-blank .Input_field {
  max-height: 20px;
}
#Smallchat .Input_field {
  width: 100%;
  resize: none;
  border: none;
  outline: none;
  padding: 0;
  padding-right: 0px;
  padding-left: 0px;
  padding-left: 20px;
  padding-right: 75px;
  background-color: transparent;
  font-size: 16px;
  line-height: 20px;
  min-height: 20px !important;
}
#Smallchat .Input_button-emoji {
  right: 45px;
}
#Smallchat .Input_button {
  position: absolute;
  bottom: 15px;
  width: 25px;
  height: 25px;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
}
#Smallchat .Input_button-send {
  right: 15px;
}
#Smallchat .Input-emoji .Input_button-emoji .Icon,
#Smallchat .Input_button:hover .Icon {
  -webkit-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
  -webkit-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
}
#Smallchat .Input-emoji .Input_button-emoji .Icon path,
#Smallchat .Input_button:hover .Icon path {
  fill: #2c2c46;
}
</style>
