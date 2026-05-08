import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Clock3, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

const serviceTimes = [
  { day: "Sunday Celebration Service", time: "7:00 AM & 9:30 AM" },
  { day: "Wednesday Bible Study", time: "6:30 PM" },
  { day: "Friday Prayer Service", time: "7:00 PM" },
];

const ministries = [
  {
    title: "Youth Ministry",
    summary:
      "A vibrant space for young people to grow in Christ, build friendships, and discover purpose.",
  },
  {
    title: "Men's Ministry",
    summary:
      "Raising godly men of integrity through discipleship, prayer, accountability, and leadership.",
  },
  {
    title: "Women's Fellowship",
    summary:
      "Strengthening women in faith, family, and calling through fellowship, worship, and mentorship.",
  },
  {
    title: "Children's Ministry",
    summary:
      "Helping children know Jesus early through biblical teaching, worship, and joyful activities.",
  },
  {
    title: "Outreach Ministry",
    summary:
      "Sharing Christ's love in practical ways across communities through evangelism and service.",
  },
  {
    title: "Prayer & Intercession",
    summary:
      "Standing in the gap for the church, families, and the nation through consistent intercession.",
  },
];

export const Route = createFileRoute("/services")({
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar revealAfterVh={0} />
      <main className="pt-16 md:pt-20">
        <section className="relative overflow-hidden services-watermark-bg">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <p className="text-primary uppercase tracking-[0.28em] text-xs font-medium mb-5">
                Worship With Us
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-semibold leading-[0.95] tracking-tight">
                Service Times &amp; Church Life
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                Join us for worship, prayer, and the Word. Below you can find our service
                schedule, church location, and ministry groups for every stage of life.
              </p>
            </motion.div>

            <div className="mt-14 grid lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                className="rounded-2xl border border-border bg-white/85 backdrop-blur-sm p-6 md:p-8 shadow-soft"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Clock3 className="text-primary" size={22} />
                  <h2 className="font-display text-3xl md:text-4xl font-semibold">Service Times</h2>
                </div>
                <div className="space-y-4">
                  {serviceTimes.map((item) => (
                    <motion.div
                      key={item.day}
                      whileHover={{ scale: 1.02 }}
                      className="rounded-xl border border-border/70 bg-background/90 p-4 md:p-5 transition-colors hover:border-primary/40"
                    >
                      <p className="font-semibold text-foreground">{item.day}</p>
                      <p className="text-primary mt-1 font-medium">{item.time}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                className="rounded-2xl border border-border bg-white/85 backdrop-blur-sm p-6 md:p-8 shadow-soft"
              >
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="text-primary" size={22} />
                  <h2 className="font-display text-3xl md:text-4xl font-semibold">Church Location</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  ICGC Greater Grace Temple<br />
                  Accra, Ghana
                </p>
                <p className="mt-4 text-sm text-muted-foreground/85">
                  Need directions? Contact us and we will help you find the easiest route.
                </p>
                <Link
                  to="/"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  Contact Church Office
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="relative py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="max-w-2xl">
              <p className="text-primary uppercase tracking-[0.28em] text-xs font-medium mb-5">
                Our Ministries
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-6xl font-semibold leading-tight">
                Find your place to grow and serve
              </h2>
            </div>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {ministries.map((ministry, index) => (
                <motion.article
                  key={ministry.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  whileHover={{ y: -5 }}
                  className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:border-primary/50 transition-all"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Users size={20} className="text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold">{ministry.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{ministry.summary}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
