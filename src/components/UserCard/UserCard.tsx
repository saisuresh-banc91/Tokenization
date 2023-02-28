import { useState, useEffect } from "react";
import CreateToken from "@/components/CreateToken/CreateToken";
import styles from '@/components/UserCard/UserCard.module.css';

const UserCard = (props: any) => {
  const [isCardNoHidden, setIsCardNoHidden] = useState(true);

  const toggleCardNumber = () => {
    const isCardNoHiddenFlag: boolean = isCardNoHidden === true ? false : true;
    setIsCardNoHidden(isCardNoHiddenFlag);
  };

  useEffect(() => {
    setIsCardNoHidden(true);
  }, [props]);

  return (
    <div className={styles.userCard}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/6404/6404078.png"
        alt="logo"
      />
      {isCardNoHidden && (
        <h3>XXXX-XXXX-XXXX-{props.userCardData.card_number.substring(15)}</h3>
      )}
      {!isCardNoHidden && <h3>{props.userCardData.card_number}</h3>}
      <div className={styles.cardButtons}>
        <CreateToken
          userID={props.userCardData.user_id}
          cardID={props.userCardData.id}
        />
        {isCardNoHidden && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={toggleCardNumber}
          >
            Show Card No
          </button>
        )}
        {!isCardNoHidden && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={toggleCardNumber}
          >
            Hide Card No
          </button>
        )}
      </div>
      <div className={styles.cardTokens}>
        <h3>{props.userCardData.name_on_card.toUpperCase()}</h3>
        <p>VALID THRU: {props.userCardData.exp_date}</p>
      </div>
    </div>
  );
};

export default UserCard;
