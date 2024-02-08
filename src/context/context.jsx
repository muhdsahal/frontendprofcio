import { createContext, useContext ,useState} from 'react';
const ApiContext = createContext();

export const useApiContext = () => {
    const context = useContext(ApiContext);
    if (!context) {
      throw new Error("useSocket must be used within a SocketContextProvider");
    }
    return context;
  };

export const ApiProvider = ({ children }) => {
  const [userCredentials, setUserCredentials] = useState(null);
  const [employeeCredentials, setEmployeeCredentials] = useState(null);

//   const apiState = {
//     apiUrl: UserDetailsURL,
//     fetchData: async (userId) => {
//       const response = await fetch(`${apiState.apiUrl}/${userId}`);
//       const data = await response.json();
//       return data;
//     },
//   };

  return <ApiContext.Provider value={{userCredentials, setUserCredentials,employeeCredentials, setEmployeeCredentials} }>{children}</ApiContext.Provider>;
};

export const useApi = () => useContext(ApiContext);