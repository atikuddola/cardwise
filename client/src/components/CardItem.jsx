import { Card, CardContent } from "@/components/ui/card";
import anime from "animejs";
import { useEffect, useRef } from "react";

export default function CardItem({ card }) {
  const ref = useRef();

  useEffect(() => {
    anime({
      targets: ref.current,
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 600,
      easing: "easeOutExpo",
    });
  }, []);

  return (
    <Card ref={ref} className="shadow-lg">
      <CardContent className="p-4">
        <h2 className="text-xl font-bold">{card.bank_name}</h2>
        <p>{card.card_name}</p>
        <p className="text-sm text-gray-500">{card.annual_fee}</p>
      </CardContent>
    </Card>
  );
}