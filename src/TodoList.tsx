import React from "react";
import { List, Avatar, Menu, Dropdown, Modal } from "antd";
import { DownOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

// import { ClickParam } from "antd/lib/menu";
// [Export event parameter types for menu · Issue \#25467 · ant\-design/ant\-design](https://github.com/ant-design/ant-design/issues/25467)
import { MenuInfo } from "rc-menu/lib/interface";

import { Todo, getUserById } from "./utils/data";

const { confirm } = Modal;

interface ActionProps {
  onClick: (key: "complete" | "delete") => void;
  isCompleted: boolean;
}

function Action({ onClick, isCompleted }: ActionProps) {
  const handleActionClick = ({ key }: MenuInfo) => {
    if (key === "complete") {
      onClick("complete");
    } else if (key === "delete") {
      onClick("delete");
    }
  };

  return (
    <Menu onClick={handleActionClick}>
      <Menu.Item key="complete">{isCompleted ? "重做" : "完成"}</Menu.Item>
      <Menu.Item key="delete">删除</Menu.Item>
    </Menu>
  );
}

const menu = (
  <Menu>
    <Menu.Item>完成</Menu.Item>
    <Menu.Item>删除</Menu.Item>
  </Menu>
);

interface TodoListProps {
  todoList: Todo[];
  onClick: (todoId: string, key: "complete" | "delete") => void;
}

function TodoList({ todoList, onClick }: TodoListProps) {
  return (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={todoList}
      renderItem={(item) => {
        const user = getUserById(item.user);

        return (
          <List.Item
            key={item.id}
            actions={[
              <Dropdown
                overlay={() => (
                  <Action
                    isCompleted={item.isCompleted}
                    onClick={(key: "complete" | "delete") =>
                      onClick(item.id, key)
                    }
                  />
                )}
              >
                <a key="list-loadmore-more">
                  操作 <DownOutlined />
                </a>
              </Dropdown>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={user.avatar} />}
              title={<a href="https://ant.design">{user.name}</a>}
              description={item.date}
            />
            <div
              style={{
                textDecoration: item.isCompleted ? "line-through" : "none",
              }}
            >
              {item.content}
            </div>
          </List.Item>
        );
      }}
    />
  );
}

export default TodoList;
