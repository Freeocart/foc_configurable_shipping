import { useI18n } from "react-simple-i18n";

import ConditionResolveType from "./ConditionResolveType";
import ConditionResolveValue from "./ConditionResolveValue";

export default function ConditionResolver() {
  const { t } = useI18n();

  return (
    <div>
      <span>{t("Then")}</span>
      <ConditionResolveType />
      <span>{t("Equals")}</span>
      <ConditionResolveValue />
    </div>
  );
}
