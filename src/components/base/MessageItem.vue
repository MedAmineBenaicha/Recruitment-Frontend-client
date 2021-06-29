<template>
  <div
    v-for="message in messages"
    :key="message.id"
    class="d-flex mb-2"
    :class="
      message.client_id
        ? 'sent-message justify-content-end client_message'
        : 'received-message justify-content-start'
    "
  >
    <div
      class="px-3"
      :class="message.client_id ? 'client_message_content' : 'user_message_content'"
    >
      {{ message.message }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["messages"],
};
</script>

<style scoped>
.received-message {
  color: #222422;
  font-weight: 400;
}
.sent-message {
  color: #222422;
  font-weight: 400;
}
.client_message_content {
  padding: 6px 7px 8px 9px;
  background-color: #dcf8c6;
  box-shadow: 0 1px 0.5px rgba(var(--shadow-rgb), 0.13);
  border-radius: 7.5px;
}
.user_message_content {
  padding: 6px 7px 8px 9px;
  background-color: #16e4aa5c;
  box-shadow: 0 1px 0.5px rgba(var(--shadow-rgb), 0.13);
  border-radius: 7.5px;
}
</style>
