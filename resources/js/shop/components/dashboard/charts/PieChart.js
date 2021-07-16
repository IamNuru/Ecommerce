import React,{ useState , useEffect} from "react";
import { Bar } from "react-chartjs-2";

const PieChart = (props) => {

  const [catNames] = useState([]);
  const [catQtys] = useState([]);

  useEffect(() => {
      if (props.categories?.length > 0) {
        for (const dataObj of props.categories) {
          catNames.push(dataObj.name);
          catQtys.push(dataObj.products.length);
        }
      }

    // eslint-disable-next-line
  }, []);


  return (
    <div>
      <Bar
          height={200}
          width={300}
          data={{
            labels: catNames?.length > 0 && catNames,
            datasets: [
              {
                label: " Categories",
                data: catQtys?.length > 0 && catQtys,
                backgroundColor:[
                  'rgba(124, 58, 237,1'
                ]
              },
            ],
          }}
          options={{
            maintainAspectRation: false,
          }}
        />
    </div>
  );
};

export default PieChart;
