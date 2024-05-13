export default function Home() {
  const src =
    "아 진짜 애드센스 통과좀 시켜주세요 ㅠㅠ 1500자 넘게 글을 써야 통과된다니 이게 말이됩니까? 이런 낡은 정책은 바뀌어야 한다고 생각합니다. 이런 꼼수를 쓰게 되잖아요 정말로 흑흑 너무슬퍼 ";
  return (
    <>
      {Array.from({ length: 100 }).map((_, idx) => (
        <span key={idx}>{src}</span>
      ))}
    </>
  );
}
