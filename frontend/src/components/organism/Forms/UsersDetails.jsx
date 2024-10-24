import useAppContext from "../../../hooks/useAppContext";

const UsersDetails = () => {
  const { forms } = useAppContext();

  console.log("forms", forms);

  return (
    <div>
      <h1>UsersDetails</h1>
    </div>
  );
};

export default UsersDetails;
