import Adjustments from './Adjustments/Adjustments';
import Content from './Content/Content';
import GlobalTopBar from './GlobalTopbar/GlobalTopBar';
import Topbar from './Topbar/Topbar';

const Homepage = () => {
  return (
    <>
      <GlobalTopBar />
      <Topbar />

      <Content />
    </>
  );
};

export default Homepage;
