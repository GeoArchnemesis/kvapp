const steps = [
  {
    title: "გაიარეთ 2-წუთიანი კითხვარი",
    body: "გვითხარით თქვენი მიზანი, გრაფიკი და რა სახის მხარდაჭერა გსურთ — მხოლოდ ხელოვნური ინტელექტი, თუ ნამდვილი ადამიანიც.",
  },
  {
    title: "მიიღეთ თქვენი კვების გეგმა",
    body: "კვირეული კვების გეგმა, შედგენილი ხელოვნური ინტელექტის მიერ ნამდვილი ქართული რეცეპტების საფუძველზე, პლუს ავტომატური სავაჭრო სია.",
  },
  {
    title: "დაამატეთ დიეტოლოგი ან მწვრთნელი ნებისმიერ დროს",
    body: "განაახლეთ პაკეტი სერტიფიცირებულ დიეტოლოგთან ყოველთვიურ კონსულტაციამდე, ან აირჩიეთ ყველაფერი ერთად — მწვრთნელთან და სავარჯიშო დარბაზთან ერთად.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="text-2xl font-bold">როგორ მუშაობს</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {steps.map((step, i) => (
          <div key={step.title}>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary">
              {i + 1}
            </div>
            <h3 className="mt-3 font-semibold">{step.title}</h3>
            <p className="mt-1 text-sm text-foreground-muted">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
