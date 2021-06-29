<template>
  <div>
    chat room
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoadingRooms: false,
      chatRooms: [],
      currentRoom: [],
      messages: [],
    };
  },
  methods: {
    getRooms() {
      this.isLoadingRooms = true;
      this.$store
        .dispatch("getRooms")
        .then((result) => {
          this.chatRooms = result.data;
          this.isLoadingRooms = false;
          this.currentRoom = result.data[0];
          this.getMessages();
        })
        .catch((error) => {
          this.isLoadingRooms = false;
          console.log(error.message);
        });
    },
    getMessages() {
      this.isLoadingMessages = true;
      this.$store
        .dispatch("getMessages",{room_id: this.currentRoom.id})
        .then((result) => {
          this.messages = result.data;
          this.isLoadingMessages = false;
          this.currentRoom = result.data[0];
        })
        .catch((error) => {
          this.isLoadingMessages = false;
          console.log(error.message);
        });
    },
  },
  created(){
      this.getRooms();
  }
};
</script>
