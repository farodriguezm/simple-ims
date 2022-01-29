import { useRecoilValue } from "recoil";
import { loaderState } from "src/atoms/loader";
import styles from "src/styles/Loader.module.css";

const Loader = () => {
  const loader = useRecoilValue(loaderState);
  return (
    <div
      className={styles.loader}
      style={{ ...(!loader && { display: "none" }) }}
    >
      <div className={styles.lds}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
