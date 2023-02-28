import { useState, useEffect } from "react";
import {
  useActivateTokensMutation,
  useSuspendTokensMutation,
  useDeleteTokensMutation,
  useGetTokensQuery
} from "@/redux/services/users";
import CancelButton from '@bhaskarj123/styled-cancel-button-github';
import DeleteButton from '@bhaskarj123/styled-delete-button-github';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import styles from '@/components/Tokens/Tokens.module.css';


const Tokens = (props: any) => {
  
  const {
    data: cardTokens,
    isFetching,
    isError,
    isSuccess,
  } = useGetTokensQuery({userID:props.userID,cardID:props.cardID}, {
    refetchOnMountOrArgChange: true,
  });
  
  
  const [tokens, setTokens] = useState([]);
  const [activateTokens, activateTokensResult] = useActivateTokensMutation();
  const [suspendTokens, suspendTokensResult] = useSuspendTokensMutation();
  const [deleteTokens, deleteTokensResult] = useDeleteTokensMutation();
  const [isAPILoaded, setAPILoaded] = useState(false);


  useEffect(() => {
    setAPILoaded(false);
    if(isFetching){
      setAPILoaded(false);
    } else if(isError){
      setAPILoaded(true);
      setTokens([]);
    } else if(isSuccess){
      setAPILoaded(true);
      setTokens(cardTokens.response);
    }
  }, [props, isFetching, activateTokensResult, suspendTokensResult, deleteTokensResult]);

  const getDomainName = (url: string) => {
    let domainName = "";

    switch (url) {
      case "https://www.flipkart.com":
        domainName = "Flipkart";
        break;
      case "https://www.croma.com":
        domainName = "Chroma";
        break;
      case "https://www.amazon.in":
        domainName = "Amazon";
        break;
      case "https://www.myntra.com":
        domainName = "Myntra";
        break;
      case "https://www.ajio.com":
        domainName = "Ajio";
        break;
      default:
        domainName = "";
    }

    return domainName;
  };

  const handleActivateToken = (tokenID: string | number) => {
    activateTokens(tokenID);
  };

  const handleSuspendToken = (tokenID: string | number) => {
    suspendTokens(tokenID);
  };

  const handleDeleteToken = (tokenID: string | number) => {
    deleteTokens(tokenID);
  };

  return (
    <div className={styles.tokensPageContainer}>
      <div className={styles.tokenContainer}>
        {!isAPILoaded && (
          <div className={styles.fetchingTokensContainer}>
            <h4>Fetching Tokens</h4>
            <div className="lds-dual-ring"></div>
          </div>
        )}
        {isAPILoaded && tokens.length === 0 && (
          <div className={styles.noTokensContainer}>
            <h2>No tokens available for this card.</h2>
          </div>
        )}
        {isAPILoaded && tokens.length > 0 && (
          <div className={styles.tokenTableContainer}>
            <table>
              <thead>
                <tr>
                  <th>
                    <h3>TOKENS</h3>
                  </th>
                  <th>
                    <h3>DOMAIN</h3>
                  </th>
                  <th className={styles.statusColumn}>
                    <h3>STATUS</h3>
                  </th>
                  <th className={styles.actionColumn}>
                    <h3>ACTIVATE/SUSPEND</h3>
                  </th>
                  <th>
                    <h3>DELETE</h3>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((token: any) => {
                  return (
                    <tr key={token.id}>
                      <td>{token.token_number}</td>
                      <td>{getDomainName(token.domain_name)}</td>
                      <td>{token.status}</td>
                      <td>
                        {token.status === "Active" && (
                          <button
                            type="button"
                            className="btn"
                            onClick={() => {
                              handleSuspendToken(token.id);
                            }}
                          >
                            Suspend
                          </button>
                        )}
                        {token.status === "Suspended" && (
                          <button
                            type="button"
                            className="btn"
                            onClick={() => {
                              handleActivateToken(token.id);
                            }}
                          >
                            Activate
                          </button>
                        )}
                      </td>
                      <td>
                        <AlertDialog.Root>
                          <AlertDialog.Trigger asChild>
                            {token.status !== "Deleted" && (
                              <button
                                type="button"
                                className="btn"
                              >
                                Delete
                              </button>
                            )}
                          </AlertDialog.Trigger>
                          <AlertDialog.Portal>
                            <AlertDialog.Overlay className="AlertDialogOverlay" />
                            <AlertDialog.Content className="AlertDialogContent">
                              <AlertDialog.Title className="AlertDialogTitle">
                                Are you sure?
                              </AlertDialog.Title>
                              <AlertDialog.Description className="AlertDialogDescription">
                                This action cannot be undone. This will
                                delete your token permanently.
                              </AlertDialog.Description>
                              <div
                                style={{
                                  display: "flex",
                                  gap: 25,
                                  justifyContent: "flex-end",
                                }}
                              >
                                <AlertDialog.Cancel asChild>
                                  <CancelButton>
                                    Cancel
                                  </CancelButton>
                                </AlertDialog.Cancel>
                                <AlertDialog.Action asChild>
                                  <DeleteButton
                                    onClick={() => {
                                      handleDeleteToken(token.id);
                                    }}
                                  >
                                    Yes, Delete Token
                                  </DeleteButton>
                                </AlertDialog.Action>
                              </div>
                            </AlertDialog.Content>
                          </AlertDialog.Portal>
                        </AlertDialog.Root>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tokens;
