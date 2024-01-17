import { useState } from "react";

type ItemsType = string[];

function useMaterialsFilter(originalItems: ItemsType) {

    const [items] = useState<ItemsType>([...originalItems]);

    const [filteredItems, setFilteredItems] = useState<ItemsType>([...originalItems]);

    function toggleItem(clickedItem: string) {
        //check if clicked item is presented in filtered items
        const index = filteredItems.findIndex((item) => clickedItem === item);
        if (index !== -1) {
            //if presented - then remov it
            setFilteredItems((state) => state.filter((item) => clickedItem !== item));
        } else {
            //otherwise add it
            setFilteredItems((state) => [...state, clickedItem]);
        }
    }

    return { items, filteredItems, toggleItem };
}

export default useMaterialsFilter;