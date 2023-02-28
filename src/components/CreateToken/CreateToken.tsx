import { useEffect, useState } from "react";
import { useCreateTokensMutation } from "@/redux/services/users";
import styles from '@/components/CreateToken/CreateToken.module.css';

const CreateToken = (props: {
  userID: string;
  cardID: string;
}) => {
  const [createTokenMessage, setCreateTokenMessage] = useState("");
  const [createTokens,createTokensResult] = useCreateTokensMutation();

  const handleSubmit = (siteName: string) => {
    let domainName = "";

    switch (siteName) {
      case "Flipkart":
        domainName = "https://www.flipkart.com";
        break;
      case "Amazon":
        domainName = "https://www.amazon.in";
        break;
      case "Myntra":
        domainName = "https://www.myntra.com";
        break;
      case "Ajio":
        domainName = "https://www.ajio.com";
        break;
      case "Chroma":
        domainName = "https://www.croma.com";
        break;
      default:
        domainName = "";
    }

    createTokens({
      userID: parseInt(props.userID),
      cardID: parseInt(props.cardID),
      domainName: domainName
    });
  };

  useEffect(() => {
    if(createTokensResult.isSuccess){
      setCreateTokenMessage("Token created successfully!");
      setTimeout(() => {
        setCreateTokenMessage("");
      }, 2000);
    } 
    if(createTokensResult.isError){
      setCreateTokenMessage("Token already exists!");
      setTimeout(() => {
        setCreateTokenMessage("");
      }, 2000);
    }
  },[createTokensResult]);

  return (
    <div className={styles.createTokenContainer}>
      <div className="dropdown createTokens">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Create Token
        </button>
        <ul
          className="dropdown-menu tokenSites"
          aria-labelledby="dropdownMenuButton1"
        >
          <li
            onClick={() => {
              handleSubmit("Flipkart");
            }}
          >
            Flipkart
          </li>
          <li
            onClick={() => {
              handleSubmit("Amazon");
            }}
          >
            Amazon
          </li>
          <li
            onClick={() => {
              handleSubmit("Myntra");
            }}
          >
            Myntra
          </li>
          <li
            onClick={() => {
              handleSubmit("Ajio");
            }}
          >
            Ajio
          </li>
          <li
            onClick={() => {
              handleSubmit("Chroma");
            }}
          >
            Chroma
          </li>
        </ul>
      </div>
      <small>{createTokenMessage}</small>
    </div>
  );
};

export default CreateToken;
