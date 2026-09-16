import {
  DonationCategory,
} from "../types/giving.types";

import DonationCategoryCard
from "./DonationCategoryCard";

interface Props {
  categories:
    DonationCategory[];

  onSelect:
    (
      category:
        DonationCategory
    ) => void;
}

export default function DonationCategoriesList({
  categories,
  onSelect,
}: Props) {
  return (
    <>
      {categories.map(
        category => (
          <DonationCategoryCard
            key={
              category.id
            }
            category={
              category
            }
            onPress={() =>
              onSelect(
                category
              )
            }
          />
        )
      )}
    </>
  );
}