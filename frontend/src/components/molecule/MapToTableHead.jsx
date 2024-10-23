const MapToTableHead = ({ heading }) => {
  return (
    <tr>
      {heading.map((items, index) => (
        <th key={index}>{items}</th>
      ))}
      <th></th>
      <th></th>
      <th></th>
    </tr>
  );
};

export default MapToTableHead;
