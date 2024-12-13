import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonTaskList:FC = () => {

  return (
    <tbody>
      {[...new Array(6)].map(() => {
        return <tr>
          <td>
            <Skeleton />
          </td>
          <td>
            <Skeleton />
          </td>
          <td>
            <Skeleton />
          </td>
          <td>
            <Skeleton />
          </td>
          <td>
            <Skeleton />
          </td>
              </tr>
      })}
    </tbody>
  );
};

export default SkeletonTaskList;
