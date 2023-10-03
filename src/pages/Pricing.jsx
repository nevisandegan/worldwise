// Uses the same styles as Product
import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <>
   
    <main className={styles.product}>
        <PageNav/>
      <section>
        <div>
          <h2>
            قیمت 
            <br />
            فقط 9 هزارتومان در ماه
          </h2>
          <p>
            با مقدار کمی پول میتوانید تمام مکان ها کشور ها شهره هارا که رفتین ثبت کنید.با لوکیشن دقیق آن.دیگر نیاز به ثبت خاطرات به صورت فیزیکی ندارید.همه جا وب اپلیکیشن worldwise همراه شما خواهد بود.تیم worldwise امیوار هست کشور ها و شهرهای زیادی را در این وب اپلیکیشن ثبت کنید.
          </p>
        </div>
        <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
    </>
  );
}
