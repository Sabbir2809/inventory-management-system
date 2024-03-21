import { NavLink } from "react-router-dom";

export const sidebarItemsGenerator = (items) => {
  const sidebarItems = items.reduce((acc, item) => {
    if (item.path && item.name) {
      acc.push({
        icon: item.icon,
        key: item.name,
        label: (
          <NavLink
            style={({ isActive }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "white" : "",
              };
            }}
            to={`/${item.path}`}>
            {item.name}
          </NavLink>
        ),
      });
    }
    if (item.children) {
      acc.push({
        icon: item.icon,
        key: item.name,
        label: item.name,
        children: item.children.map((child) => {
          if (child.name) {
            return {
              icon: child.icon,
              key: child.name,
              label: (
                <NavLink
                  style={({ isActive }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                      color: isActive ? "white" : "",
                    };
                  }}
                  to={`/${child.path}`}>
                  {child.name}
                </NavLink>
              ),
            };
          }
        }),
      });
    }
    return acc;
  }, []);
  return sidebarItems;
};
