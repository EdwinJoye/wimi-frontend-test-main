import { Box, SegmentedControl, Tabs, Text, Title } from "@mantine/core";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { HiOutlinePaintBrush, HiOutlineUser } from "react-icons/hi2";
import { IoCogOutline, IoLanguageOutline } from "react-icons/io5";
import IconSegmentedButton from "~/components/buttons/icon-segmented.button";
import AccountTab from "~/components/tabs/account.tab";
import AppearanceTab from "~/components/tabs/appearance.tab";
import GeneralTab from "~/components/tabs/general.tab";
import LanguageTab from "~/components/tabs/language.tab";
import PageLayout from "~/layouts/page.layout";

const SettingsPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string | null>("general");

  return (
    <PageLayout>
      <Box mb="xl">
        <Title order={1} size="h2" mb="xs">
          {t("titles.parameters")}
        </Title>
        <Text c="dimmed" size="sm">
          {t("messages.manage_your_account")}
        </Text>
      </Box>

      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        variant="pills"
        radius="md"
      >
        <SegmentedControl
          mb="xl"
          color="blue"
          className="w-[50%]!"
          value={activeTab || "general"}
          onChange={setActiveTab}
          classNames={{
            root: "rounded-full!",
            indicator: "rounded-full!",
          }}
          data={[
            {
              value: "general",
              label: (
                <IconSegmentedButton
                  icon={IoCogOutline}
                  label={t("labels.general")}
                />
              ),
            },
            {
              value: "appearance",
              label: (
                <IconSegmentedButton
                  icon={HiOutlinePaintBrush}
                  label={t("labels.appearance")}
                />
              ),
            },
            {
              value: "language",
              label: (
                <IconSegmentedButton
                  icon={IoLanguageOutline}
                  label={t("labels.languages")}
                />
              ),
            },
            {
              value: "account",
              label: (
                <IconSegmentedButton
                  icon={HiOutlineUser}
                  label={t("labels.account")}
                />
              ),
            },
          ]}
        />
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <GeneralTab />
          <AppearanceTab />
          <LanguageTab />
          <AccountTab />
        </motion.div>
      </Tabs>
    </PageLayout>
  );
};

export default SettingsPage;
