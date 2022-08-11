import Header from './components/Header/Header';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import AppRoutes from './routes/AppRoutes';

function App() {
    return (
        <div className="App">
            <Header />
            <Content>
                <AppRoutes />
            </Content>
            <Footer />
        </div>
    );
}

export default App;
