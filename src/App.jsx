import { useMemo, useState } from 'react';

const areas = [
  {
    id: 'eyes', label: '눈', desc: '눈매, 눈빛, 신뢰감, 인연운',
    options: [
      ['부드러운 눈매', '친화력과 인연운 인상이 보완될 수 있습니다.', '너무 순해 보이면 존재감이 약해질 수 있습니다.'],
      ['또렷한 눈매', '집중력과 직업운 인상이 또렷하게 느껴질 수 있습니다.', '과하면 차갑거나 예민한 인상으로 보일 수 있습니다.'],
      ['긴 눈매', '세련미와 귀인운 분위기가 강화될 수 있습니다.', '얼굴형과 균형이 맞지 않으면 날카로워 보일 수 있습니다.']
    ]
  },
  {
    id: 'nose', label: '코', desc: '재물운, 중심축, 얼굴의 기세',
    options: [
      ['버선코', '호감과 부드러운 재물운 인상이 보완될 수 있습니다.', '너무 들린 느낌이 강하면 가벼운 인상으로 보일 수 있습니다.'],
      ['직선코', '신뢰감과 안정적인 재물운 인상이 강화될 수 있습니다.', '너무 높으면 전체 조화가 깨져 보일 수 있습니다.'],
      ['반버선코', '부드러움과 세련미가 균형 있게 느껴질 수 있습니다.', '코끝과 콧대의 비율이 핵심입니다.']
    ]
  },
  {
    id: 'jaw', label: '턱', desc: '말년운, 안정감, 인내심',
    options: [
      ['부드러운 V라인', '세련미와 부드러운 인상이 보완될 수 있습니다.', '과하게 얇으면 안정감이 약해 보일 수 있습니다.'],
      ['둥근 턱', '복상과 안정적인 말년운 분위기가 느껴질 수 있습니다.', '라인 정리가 부족하면 둔해 보일 수 있습니다.'],
      ['균형형 턱끝', '신뢰감과 장기적인 안정감이 보완될 수 있습니다.', '너무 길면 강한 인상으로 보일 수 있습니다.']
    ]
  },
  {
    id: 'cheek', label: '광대', desc: '리더십, 추진력, 사회운',
    options: [
      ['부드러운 광대', '대인관계와 호감상이 부드럽게 보완될 수 있습니다.', '과하게 줄이면 개성이 약해 보일 수 있습니다.'],
      ['입체 광대', '카리스마와 사회운 인상이 강화될 수 있습니다.', '과하면 강하고 부담스러운 인상이 될 수 있습니다.'],
      ['균형 광대', '추진력과 부드러움의 조화가 좋아 보일 수 있습니다.', '눈·코·턱과 함께 비율을 봐야 합니다.']
    ]
  },
  {
    id: 'lips', label: '입술', desc: '표현력, 말복, 애정운',
    options: [
      ['도톰한 입술', '표현력과 애정운 인상이 따뜻하게 느껴질 수 있습니다.', '과하면 자연스러움이 떨어질 수 있습니다.'],
      ['입꼬리 상승형', '호감과 대인운 분위기가 밝아질 수 있습니다.', '표정과 맞지 않으면 어색해 보일 수 있습니다.'],
      ['균형형 입술', '안정적인 관계운과 신뢰감이 보완될 수 있습니다.', '전체 얼굴 분위기와 맞춰야 합니다.']
    ]
  },
  {
    id: 'ears', label: '귀', desc: '복, 기본운, 장기운',
    options: [
      ['또렷한 귀 라인', '기본운과 안정감이 또렷하게 느껴질 수 있습니다.', '측면 사진 기준의 해석이 중요합니다.'],
      ['부드러운 귓불', '인복과 복상 분위기가 부드럽게 보완될 수 있습니다.', '실제 변화보다 이미지 해석 중심으로 보는 것이 좋습니다.'],
      ['균형형 귀', '전체 기운이 안정적으로 정리되어 보일 수 있습니다.', '헤어스타일 영향도 함께 봐야 합니다.']
    ]
  },
  {
    id: 'forehead', label: '이마', desc: '초년운, 지성, 확장성',
    options: [
      ['넓고 깨끗한 이마', '시야와 확장성이 좋아 보이는 인상이 생길 수 있습니다.', '너무 넓으면 부담스러워 보일 수 있습니다.'],
      ['부드러운 이마 라인', '온화함과 안정적인 초년운 분위기가 느껴질 수 있습니다.', '헤어라인과 자연스럽게 이어져야 합니다.'],
      ['균형형 이마', '지성과 부드러움의 균형이 좋아 보일 수 있습니다.', '얼굴 길이와 함께 봐야 합니다.']
    ]
  },
  {
    id: 'brows', label: '눈썹', desc: '의지, 관계, 인상 방향',
    options: [
      ['부드러운 아치형', '관계운과 호감상이 부드럽게 보완될 수 있습니다.', '과하면 인위적으로 보일 수 있습니다.'],
      ['또렷한 직선형', '결단력과 신뢰감이 강해 보일 수 있습니다.', '너무 진하면 인상이 강해질 수 있습니다.'],
      ['자연 균형형', '자연스러움과 단정함이 함께 느껴질 수 있습니다.', '얼굴 골격에 맞춘 두께가 중요합니다.']
    ]
  },
  {
    id: 'shape', label: '얼굴형', desc: '전체 조화, 분위기, 첫인상',
    options: [
      ['계란형', '부드러운 조화와 대중적인 호감상이 느껴질 수 있습니다.', '개성이 약해지지 않게 포인트를 남겨야 합니다.'],
      ['부드러운 둥근형', '복상과 따뜻한 인상이 보완될 수 있습니다.', '라인이 흐려 보이지 않게 균형이 필요합니다.'],
      ['입체 균형형', '세련미와 안정감이 함께 느껴질 수 있습니다.', '과한 입체감은 강한 인상으로 보일 수 있습니다.']
    ]
  }
];

const baseScores = [
  ['재물운상', 68, 81],
  ['귀인운상', 61, 78],
  ['인연운상', 74, 83],
  ['말년운상', 57, 76]
];

function UploadBox({ title, note, file, onChange }) {
  const src = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file]);
  return (
    <label className="uploadBox">
      {src ? <img src={src} alt={title} /> : <div className="uploadInner"><b>{title}</b><span>{note}</span><em>사진 업로드</em></div>}
      <input type="file" accept="image/*" onChange={(e) => onChange(e.target.files?.[0] || null)} />
    </label>
  );
}

function Score({ name, before, after, changed }) {
  const value = changed ? after : before;
  return (
    <div className="scoreCard">
      <div className="scoreTop"><b>{name}</b><span>{value}</span></div>
      <div className="bar"><i style={{ width: `${value}%` }} /></div>
      <small>{changed ? `기준 대비 +${after - before}` : '현재 분석 기준'}</small>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  const [gender, setGender] = useState('');
  const [front, setFront] = useState(null);
  const [side, setSide] = useState(null);
  const [active, setActive] = useState('nose');
  const [choices, setChoices] = useState({ nose: '반버선코' });

  const activeArea = areas.find((a) => a.id === active) || areas[1];
  const count = Object.keys(choices).length;
  const ready = gender && front && side;
  const changedScores = baseScores.map(([n, b, a], idx) => [n, b, Math.min(95, a + Math.max(0, count - 1) * (idx + 1))]);

  return (
    <main>
      <header className="topbar">
        <button className="brand" onClick={() => setPage('home')}><span>美</span><div><b>미인박명</b><small>AI Face Fortune Studio</small></div></button>
        <nav><button onClick={() => setPage('onboarding')}>시작하기</button></nav>
      </header>

      {page === 'home' && <section className="hero">
        <div className="heroText">
          <p className="eyebrow">AI 관상 이미지 컨설턴트</p>
          <h1>미인박명</h1>
          <h2>예로부터 미인박명이라 했지만,<br />관상에서는 조화로운 미인이 오래 사랑받는다고 합니다.</h2>
          <p className="lead">정면·측면 사진으로 현재 관상을 분석하고, 눈·코·턱·광대·귀·입술 등을 바꿔보며 나에게 맞는 미인상을 찾아보세요.</p>
          <button className="primary" onClick={() => setPage('onboarding')}>내 관상 더 좋게 만들 얼굴 찾으러가기</button>
          <p className="disclaimer">관상 해석은 엔터테인먼트 및 이미지 컨설팅 참고용이며, 의학적 진단이나 성형 결과 보장이 아닙니다.</p>
        </div>
        <div className="heroPanel">
          <div className="mockBook"><span>相</span><b>Before / After</b><p>관상 개선 미리보기</p></div>
          <div className="faceRows"><div><i>현재</i><strong>68</strong></div><div><i>추천 미인상</i><strong>84</strong></div></div>
          <ul><li>중심축 안정감</li><li>호감상 보완</li><li>과한 변화 경고</li></ul>
        </div>
      </section>}

      {page === 'onboarding' && <section className="onboarding">
        <div className="introCard">
          <p className="eyebrow">Start Analysis</p>
          <h2>먼저 분석 기준을 선택해주세요</h2>
          <p>성별 기준에 따라 관상 해석과 미인상 추천 방향을 다르게 구성합니다.</p>
          <div className="genderGrid">
            <button className={gender === 'female' ? 'selected' : ''} onClick={() => setGender('female')}><b>여성상 분석</b><span>부드러움, 귀티, 인연운, 조화로운 미인상</span></button>
            <button className={gender === 'male' ? 'selected' : ''} onClick={() => setGender('male')}><b>남성상 분석</b><span>신뢰감, 재물운, 직업운, 안정감 있는 인상</span></button>
          </div>
          <p className="notice">실제 서비스에서는 사진 보안, 삭제 옵션, 미성년자 보호, 의료광고 문구 검수 기능을 반드시 넣어야 합니다.</p>
        </div>
        <div className="uploadGrid">
          <UploadBox title="정면 사진" note="얼굴 전체가 잘 보이는 정면 사진" file={front} onChange={setFront} />
          <UploadBox title="측면 사진" note="코, 턱, 이마 라인을 볼 수 있는 측면 사진" file={side} onChange={setSide} />
          <button disabled={!ready} className="analyze" onClick={() => setPage('studio')}>관상 분석 시작하기</button>
        </div>
      </section>}

      {page === 'studio' && <section className="studio">
        <aside className="sideCol">
          <div className="panel"><h3>현재 관상 리포트</h3>{baseScores.map(([n,b,a]) => <Score key={n} name={n} before={b} after={a} />)}</div>
          <div className="darkPanel"><b>AI 요약</b><p>중심축은 안정적이지만 코끝·턱끝·입꼬리 방향을 조금 더 부드럽게 정리하면 호감과 안정감이 함께 올라가는 상으로 해석됩니다.</p></div>
        </aside>
        <section className="centerCol">
          <div className="sectionHead"><div><p className="eyebrow">Face Design Studio</p><h2>부위별로 얼굴을 바꿔보세요</h2></div><span>선택 {count}개 적용 중</span></div>
          <div className="areaGrid">{areas.map((a) => <button key={a.id} className={active === a.id ? 'active' : ''} onClick={() => setActive(a.id)}><b>{a.label}</b><small>{a.desc}</small>{choices[a.id] && <em>ON</em>}</button>)}</div>
          <div className="optionPanel">
            <div className="optionHead"><div><h3>{activeArea.label} 타입 선택</h3><p>선택하면 변경 후 관상 리포트에 반영됩니다.</p></div><button onClick={() => setChoices({})}>초기화</button></div>
            <div className="optionGrid">{activeArea.options.map(([name, pos, cau]) => <button key={name} className={choices[activeArea.id] === name ? 'picked' : ''} onClick={() => setChoices({ ...choices, [activeArea.id]: name })}><b>{name}</b><span>{pos}</span><small>{cau}</small></button>)}</div>
          </div>
          <div className="preview"><div>원본 얼굴</div><div>변경안 미리보기</div></div>
        </section>
        <aside className="sideCol">
          <div className="panel"><h3>변경 후 관상</h3>{changedScores.map(([n,b,a]) => <Score key={n} name={n} before={b} after={a} changed />)}</div>
          <div className="panel small"><b>좋아진 부분</b><p>선택한 부위가 얼굴 중심축과 조화를 이루며 호감, 신뢰감, 안정감이 보완될 수 있습니다.</p></div>
          <div className="warn"><b>우려되는 부분</b><p>광대와 턱을 과하게 줄이면 추진력과 안정감이 약해 보일 수 있어요. 자연스러운 변화 폭을 유지하는 것이 좋습니다.</p></div>
          <div className="actions"><button>저장</button><button>공유</button></div>
        </aside>
      </section>}
    </main>
  );
}
