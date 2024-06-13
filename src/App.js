import { useState } from "react";
import FormSplitBill from "./components/FormSplitBill";
import Button from "./components/Button";
import FormAddFriend from "./components/FormAddFriend";
import FriendsList from "./components/FriendList";

const initialFriends = [
  {
    id: 111111,
    name: "Momo",
    /*     image: "https://i.imgur.com/X8yvO9s.jpeg", */
    image: "https://i.imgur.com/S2ovZbR.jpeg",
    balance: 0,
  },
  {
    id: 118836,
    name: "Daju",
    image: "https://i.imgur.com/mhbAKHu.jpeg",
    balance: 0,
  },
  {
    id: 933372,
    name: "Georgie",
    image: "https://i.imgur.com/tiA94o5.jpeg",
    balance: 0,
  },
  {
    id: 499476,
    name: "Touka",
    image: "https://i.imgur.com/5fDxYY3.jpeg",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((cur) => !cur);
  }

  function handleAddFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    if (selectedFriend?.id === friend.id) {
      setSelectedFriend(null);
    } else {
      setSelectedFriend(friend);
    }
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends(
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}
