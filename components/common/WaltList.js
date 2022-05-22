import Link from "next/link";
import { useState } from "react";
const WaltList = ({ item, id }) => {
  console.log(item);
  const [validator, setValidator] = useState();
  const [validation, setValidation] = useState(null);
  function keyCheck() {
    if (validator === item?.key) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  };
  return (
    <>
      {" "}
      <tr>
        <td>#{id}</td>
        <td>{item?.title}</td>
        <td>
          <div className="row">
            <div className="col-6">
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter security key"
                onChange={(e) => setValidator(e.target.value)}
              />
            </div>
            <div className="col-6">
              {" "}
              <button className="btn btn-success" onClick={keyCheck}>
                Validate
              </button>
            </div>
          </div>
        </td>
        <td>
          {validation === null ? (
            <></>
          ) : (
            <>
              {" "}
              {validation === true ? (
                <>
                  <Link href={item?.document?.url}>
                    <a target="_blank">View</a>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/encript">
                    <a target="_blank">View</a>
                  </Link>
                </>
              )}
            </>
          )}
        </td>
      </tr>
    </>
  );
};

export default WaltList;
