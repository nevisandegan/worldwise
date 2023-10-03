import styles from "./Homepage.module.css";
import { Link } from "react-router-dom";
import PageNav from '../components/PageNav'

export default function Homepage() {
  return (
    <main className={styles.homepage}>
    <PageNav/>
      <section>
        <h1>
            در سفر هایتان
          <br />
          WorldWise ماجراهای شما را ثبت می کند
        </h1>
        <h2>
          نقشه جهانی که قدم های شما را در هر شهری که فکرش را بکنید ردیابی می کند
          . هرگز تجربیات شگفت انگیز خود را فراموش نکنید و به دوستان خود نشان دهید که چگونه
          تو جاهای مختلف دنیا پرسه زدی
        </h2>
          <Link to='/login' className='cta'>ردیابی را شروع کنید</Link>
      </section>
    </main>
  );
}
