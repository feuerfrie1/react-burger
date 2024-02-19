import styles from "../user/user.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState, JSX, SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, editUser } from "../../services/store/user/actions";
import { selectUser } from "../../services/store/user/reducers";
import { TMonoTypeObject, TUser } from "../../utils/types";
import { TICons } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

type TUserIcons = {
  [name: string]: keyof TICons | undefined;
};

export default function User(): JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(getUser());
  }, []);

  const user: TUser | null = useSelector(selectUser);

  const [name, setName] = useState(user!.name);
  const [email, setEmail] = useState(user!.email);
  const [password, setPassword] = useState("");

  const [isEditButtonsShown, setIsEditButtonsShown] = useState(false);

  const [icons, setIcons] = useState<TUserIcons>({
    name: "EditIcon",
    email: "EditIcon",
    password: "EditIcon",
  });

  function startEditingPersonalData(e: SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setIsEditButtonsShown(true);
    setIcons({
      ...icons,
      [target.name]: "CloseIcon",
    });
  }

  function cancelEditingPersonalData() {
    setName(user ? user["name"] : "");
    setEmail(user ? user["email"] : "");
    setPassword("");
    finishEditingPersonalData();
  }

  function finishEditingPersonalData() {
    setIsEditButtonsShown(false);
    setIcons({
      name: "EditIcon",
      email: "EditIcon",
      password: "EditIcon",
    });
  }

  function confirmEditingPersonalData(e: SyntheticEvent) {
    e.preventDefault();
    const data: TMonoTypeObject<string> = {};
    if (user) {
      if (name !== user.name) {
        data.name = name;
      }
      if (email !== user.email) {
        data.email = email;
      }
      if (password !== "") {
        data.password = password;
      }
      // @ts-ignore
      dispatch(editUser(data));
      finishEditingPersonalData();
    }
  }

  return (
    <>
      <form className={styles.form}>
        <Input
          value={name}
          placeholder="Имя"
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          onClick={startEditingPersonalData}
          extraClass="mb-6"
          icon={icons.name}
        ></Input>
        <Input
          value={email}
          placeholder="Логин"
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          onClick={startEditingPersonalData}
          extraClass="mb-6"
          icon={icons.email}
        ></Input>
        <Input
          value={password}
          placeholder="Пароль"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          onClick={startEditingPersonalData}
          extraClass="mb-6"
          icon={icons.password}
        ></Input>
        {isEditButtonsShown && (
          <div className={styles.buttonsWrapper}>
            <Button
              onClick={cancelEditingPersonalData}
              htmlType="button"
              type="secondary"
              size="medium"
            >
              Отмена
            </Button>
            <Button
              onClick={confirmEditingPersonalData}
              htmlType="submit"
              type="primary"
              size="medium"
            >
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </>
  );
}
