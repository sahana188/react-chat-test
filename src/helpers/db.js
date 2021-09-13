import { db } from "../services/firebase";

export function read_Chats() {
  let arr = [];
  db.ref("chats").on("value", snapshot => {
    snapshot.forEach(snap => {
      arr.push(snap.val())
    });
    return arr;
  });
}

export function write_Chats(message) {
  return db.ref("chats").push({
    content: message.content,
    timestamp: message.timestamp,
    uid: message.uid
  });
}
