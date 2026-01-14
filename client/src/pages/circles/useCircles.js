import { useState } from "react";

export function useCircles() {
  const [myCircles, setMyCircles] = useState([]);
  const [circleName, setCircleName] = useState("");
  const [circleKey, setCircleKey] = useState("");
  const [inviteLink, setInviteLink] = useState("");

  const createCircle = (name) => {
    if (!name.trim()) return;

    const key = Math.random().toString(36).substring(2, 8).toUpperCase();
    const link = `https://gratuityjar.app/circles/join/${key}`;

    const newCircle = { name, key, link };
    setMyCircles((prev) => [...prev, newCircle]);

    setCircleName(name);
    setCircleKey(key);
    setInviteLink(link);
  };

  const selectCircle = (circle) => {
    setCircleName(circle.name);
    setCircleKey(circle.key);
    setInviteLink(circle.link);
  };

  const resetCircle = () => {
    setCircleName("");
    setCircleKey("");
    setInviteLink("");
  };

  return {
    myCircles,
    circleName,
    circleKey,
    inviteLink,
    setCircleName,
    createCircle,
    selectCircle,
    resetCircle,
  };
}
