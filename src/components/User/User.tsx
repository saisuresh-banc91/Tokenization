import { useState,useEffect } from "react";
import styles from '@/components/User/User.module.css';
import UserCard from "@/components/UserCard/UserCard";
import Tokens from "@/components/Tokens/Tokens";

const User = () => {
  
  const [userCards,setUserCards] = useState<any[]>([]);
  const [currentUserCard, setCurrentUserCard] = useState<any>({});

  useEffect(() => {
    const userDataString: string|null = localStorage.getItem("UserData");
  
    if(userDataString !== null){
      setUserCards(JSON.parse(userDataString));
    }
  },[]);

  useEffect(() => {
    if(userCards.length > 0){
      setCurrentUserCard(userCards[0]);
    }
  },[userCards]);

  const handleNextClick = () => {
    let newIndex:number = 0;
    for(let card of userCards){
      if(JSON.stringify(card) === JSON.stringify(currentUserCard)){
        newIndex = userCards.indexOf(card) + 1;
        break;
      }
    }
    setCurrentUserCard(userCards[newIndex]);
  };

  const handlePreviousClick = () => {
    let newIndex:number = 0;
    for(let card of userCards){
      if(JSON.stringify(card) === JSON.stringify(currentUserCard)){
        newIndex = userCards.indexOf(card) - 1;
        break;
      }
    }
    setCurrentUserCard(userCards[newIndex]);
  };

  return (
    <>
      {userCards.length > 0 && Object.keys(currentUserCard).length > 0 && 
      <div className={styles.userContainer}>
        <div className={styles.userDetailsContainer}>
          <div className={styles.userLogo}>
            <i className="fa-solid fa-user"></i>
          </div>
          <div className={styles.userDetails}>
            <h1>{userCards[0].name.toUpperCase()}</h1>
            <h5>
              <i className="fa-solid fa-envelope"></i> {userCards[0].email}
            </h5>
            <h5>
              <i className="fa-solid fa-phone"></i> {userCards[0].mobile}
            </h5>
          </div>
        </div>
        <div className={styles.cardDetails}>
          <h1>CARDS</h1>
          <div className={styles.cardViewContainer}>
            <button
              type="button"
              className="btn navigateButtons"
              onClick={handlePreviousClick}
              disabled={JSON.stringify(currentUserCard) === JSON.stringify(userCards[0])}
            >
              &laquo;
            </button>
            <UserCard
              userCardData={currentUserCard}
            />
            <button
              type="button"
              className="btn navigateButtons"
              onClick={handleNextClick}
              disabled={
                JSON.stringify(currentUserCard) === JSON.stringify(userCards[userCards.length-1])
              }
            >
              &raquo;
            </button>
          </div>
          <Tokens
            userID={currentUserCard.user_id}
            cardID={currentUserCard.id}
          />
        </div>
      </div>}
    </>
  );
};

export default User;
