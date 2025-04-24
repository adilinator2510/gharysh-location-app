import React from 'react';
import { Friend } from '../types';
import '../styles/App.css';

interface FriendsListProps {
  friends: Friend[];
}

const FriendsList: React.FC<FriendsListProps> = ({ friends }) => {
  return (
    <div className="friends-list">
      <h2>Friends</h2>
      <ul>
        {friends.map(friend => (
          <li key={friend.id} className="friend-item">
            <span className={`online-status ${friend.isOnline ? 'online' : 'offline'}`}></span>
            <span>{friend.name}</span>
            {friend.isOnline && (
              <span className="online-label">Online</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
