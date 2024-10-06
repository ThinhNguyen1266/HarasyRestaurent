import axios from "axios";

const content = await axios.get("http://localhost:8080/foods");

const Foods = () => {
  const foods = content.data;
  console.log(foods);
  return (
    <div>
      {foods.map(({ name, price }) => {
        return (
          <div>
            {name} + {price}{" "}
          </div>
        );
      })}
    </div>
  );
};

export default Foods;
