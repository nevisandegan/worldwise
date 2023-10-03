import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span className={`${styles.emoji} fi-${country.emoji}`} />
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
