import useAppContext from "../../../hooks/useAppContext";

const UsersUpdate = () => {
  const { forms } = useAppContext();
  const { view } = forms;

  console.log("view", view);

  return (
    <div>
      <h1>usersUpdate</h1>
    </div>
  );
};

export default UsersUpdate;
