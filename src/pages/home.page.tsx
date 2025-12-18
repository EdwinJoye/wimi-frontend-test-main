import { motion } from "framer-motion";
import PersonalCard from "~/components/cards/personal.card";
import PageLayout from "~/layouts/page.layout";

const HomePage = () => {
  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-[7%] justify-center flex"
      >
        <PersonalCard />
      </motion.div>
    </PageLayout>
  );
};

export default HomePage;
