import React, {useState, useEffect} from 'react';
import {
  BackHandler,
  StatusBar,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Entypo';
import IconButton from 'react-native-vector-icons/AntDesign';
import {
  Page,
  TextTitulo,
  TextSubtitulo,
  Card,
  CardInfo,
  TextCardPrimary,
  TextCardSubtitulo,
  CardAreaDividida,
  CardRight,
  CardLeft,
  CardButton,
  CardTextButton,
  Linha,
  Lucro,
} from '../../components/styles';
import CurrencyFormat from 'react-currency-format';
import Toast from 'react-native-toast-message';
import PTRView from 'react-native-pull-to-refresh';
import api from '../../services/api';
import ModalOption from './ModalOption';
import {toastConfig} from '../../core/toastConfig';

export default function Home({navigation}) {
  const [loading, setloading] = useState(true);
  const [lista, setlista] = useState([]);
  const [total, settotal] = useState(0);
  const [limit, setlimit] = useState(15);
  const [investimentos, setinvestimentos] = useState({
    investido: 0,
    atual: 0,
    notas: 0,
  });

  const [ativo, setativo] = useState(null);
  const [modalVisibleOption, setmodalVisibleOption] = useState(false);

  const fetchData = async () => {
    const response = await api.post('/jwt/ativo/list', {
      limit,
    });

    if (response.data && response.data.data) {
      settotal(response.data.total);

      setlista(
        response.data.data.sort((a, b) => {
          const comprarA = parseInt(
            ((a.nota / response.data.aggregate.notas) *
              response.data.aggregate.atual -
              a.quantidade * a.preco) /
              a.preco,
          );
          const comprarB = parseInt(
            ((b.nota / response.data.aggregate.notas) *
              response.data.aggregate.atual -
              b.quantidade * b.preco) /
              b.preco,
          );

          if (comprarA < comprarB) {
            return 1;
          }
          if (comprarA > comprarB) {
            return -1;
          }

          return 0;
        }),
      );
      setinvestimentos(response.data.aggregate);
      setloading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, loading]);

  function closeModal() {
    fetchData();
    setmodalVisibleOption(false);
  }

  function renderItem({item, index}) {
    return (
      <React.Fragment key={index}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            lista[index].open = !lista[index].open;
            setlista([...lista]);
          }}
          onLongPress={() => {
            setativo(item);
            setmodalVisibleOption(true);
          }}>
          <Card>
            <CardAreaDividida>
              <CardLeft>
                <TextCardPrimary color="#fff">
                  {item.nome ? item.nome : ''}
                </TextCardPrimary>
              </CardLeft>
              <CardRight>
                <TouchableOpacity
                  onPress={() => {
                    lista[index].open = !lista[index].open;
                    setlista([...lista]);
                  }}>
                  <Icon
                    name={
                      lista[index].open
                        ? 'chevron-with-circle-up'
                        : 'chevron-with-circle-down'
                    }
                    color="#fff"
                    size={18}
                  />
                </TouchableOpacity>
              </CardRight>
            </CardAreaDividida>
            <Linha />
            <CardAreaDividida>
              <CardLeft>
                <TextCardSubtitulo>
                  Qtd {item.quantidade ? item.quantidade : ''}
                </TextCardSubtitulo>
                <TextCardSubtitulo>
                  Atual{' '}
                  <CurrencyFormat
                    value={item.quantidade * item.preco || 0}
                    renderText={(value) => <Text>{value}</Text>}
                    displayType={'text'}
                    thousandSeparator="."
                    decimalSeparator={','}
                    prefix={'R$ '}
                    decimalScale={2}
                    fixedDecimalScale={true}
                  />
                </TextCardSubtitulo>
              </CardLeft>
              <CardRight>
                <TextCardSubtitulo>
                  Tenho{' '}
                  {parseFloat(
                    ((item.quantidade * item.preco) / investimentos.atual) *
                      100,
                  ).toFixed(2)}
                  {'% '}/ Ideal{' '}
                  {parseFloat((item.nota / investimentos.notas) * 100).toFixed(
                    2,
                  )}
                  {'% '}
                </TextCardSubtitulo>
                <TextCardSubtitulo>
                  Lucro{' '}
                  <CurrencyFormat
                    value={
                      item.quantidade * item.preco -
                      item.quantidade * item.preco_medio
                    }
                    renderText={(value) => (
                      <Lucro
                        color={
                          item.quantidade * item.preco -
                            item.quantidade * item.preco_medio >
                          0
                            ? '#5cb85c'
                            : '#d9534f'
                        }>
                        {value}
                      </Lucro>
                    )}
                    displayType={'text'}
                    thousandSeparator="."
                    decimalSeparator={','}
                    prefix={'R$ '}
                    decimalScale={2}
                    fixedDecimalScale={true}
                  />
                </TextCardSubtitulo>
              </CardRight>
            </CardAreaDividida>
          </Card>
        </TouchableOpacity>
        {item.open ? (
          <CardInfo>
            <CardAreaDividida>
              <CardLeft>
                <TextCardSubtitulo>
                  Corretora: {item.corretora ? item.corretora : ''}
                </TextCardSubtitulo>
                <TextCardSubtitulo>
                  Categoria: {item.tipo ? item.tipo : ''}
                </TextCardSubtitulo>
                <TextCardSubtitulo>
                  Setor: {item.setor ? item.setor : ''}
                </TextCardSubtitulo>
                <TextCardSubtitulo>
                  Preço Médio: R$ {item.preco_medio ? item.preco_medio : ''}
                </TextCardSubtitulo>
              </CardLeft>
              <CardRight>
                <TextCardSubtitulo>
                  Nota {item.nota ? item.nota : ''}
                </TextCardSubtitulo>
                <TextCardSubtitulo>
                  {parseInt(
                    ((item.nota / investimentos.notas) * investimentos.atual -
                      item.quantidade * item.preco) /
                      item.preco,
                  ) > 0
                    ? 'Comprar'
                    : 'Aguardar'}{' '}
                  {parseInt(
                    ((item.nota / investimentos.notas) * investimentos.atual -
                      item.quantidade * item.preco) /
                      item.preco,
                  )}
                </TextCardSubtitulo>
                <TextCardSubtitulo>
                  Ideal:{' '}
                  <CurrencyFormat
                    value={
                      (item.nota / investimentos.notas) * investimentos.atual
                    }
                    renderText={(value) => <Text>{value}</Text>}
                    displayType={'text'}
                    thousandSeparator="."
                    decimalSeparator={','}
                    prefix={'R$ '}
                    decimalScale={2}
                    fixedDecimalScale={true}
                  />
                </TextCardSubtitulo>
                <TextCardSubtitulo>
                  Falta:{' '}
                  <CurrencyFormat
                    value={
                      (item.nota / investimentos.notas) * investimentos.atual -
                      item.quantidade * item.preco
                    }
                    renderText={(value) => <Text>{value}</Text>}
                    displayType={'text'}
                    thousandSeparator="."
                    decimalSeparator={','}
                    prefix={'R$ '}
                    decimalScale={2}
                    fixedDecimalScale={true}
                  />
                </TextCardSubtitulo>
              </CardRight>
            </CardAreaDividida>
            <CardButton
              onPress={() => {
                setativo(item);
                setmodalVisibleOption(true);
              }}>
              <CardTextButton color="#202547">Opções</CardTextButton>
            </CardButton>
          </CardInfo>
        ) : null}
      </React.Fragment>
    );
  }

  return (
    <>
      <PTRView onRefresh={() => setloading(true)}>
        <Page>
          <ModalOption
            modalVisibleOption={modalVisibleOption}
            closeModal={closeModal}
            ativo={ativo}
          />
          <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
          <StatusBar barStyle="light-content" backgroundColor="#202547" />
          <TextTitulo>Carteira de Investimento</TextTitulo>
          <TextSubtitulo>
            Investido:{' '}
            <CurrencyFormat
              value={investimentos.investido || 0}
              renderText={(value) => <Text>{value}</Text>}
              displayType={'text'}
              thousandSeparator="."
              decimalSeparator={','}
              prefix={'R$ '}
              decimalScale={2}
              fixedDecimalScale={true}
            />{' '}
            / Patrimonio Total:{' '}
            <CurrencyFormat
              value={investimentos.atual || 0}
              renderText={(value) => <Text>{value}</Text>}
              displayType={'text'}
              thousandSeparator="."
              decimalSeparator={','}
              prefix={'R$ '}
              decimalScale={2}
              fixedDecimalScale={true}
            />
          </TextSubtitulo>
          <TextSubtitulo>
            Resultado{' '}
            <CurrencyFormat
              value={investimentos.atual - investimentos.investido || 0}
              renderText={(value) => (
                <Lucro
                  color={
                    investimentos.atual - investimentos.investido > 0
                      ? '#5cb85c'
                      : '#d9534f'
                  }>
                  {value}
                </Lucro>
              )}
              displayType={'text'}
              thousandSeparator="."
              decimalSeparator={','}
              prefix={'R$ '}
              decimalScale={2}
              fixedDecimalScale={true}
            />{' '}
            / Rentabilidade{' '}
            {parseFloat(
              investimentos.atual -
                investimentos.investido / investimentos.investido || 0,
            ).toFixed(2)}{' '}
            %
          </TextSubtitulo>
          <TextTitulo>Seus Ativos</TextTitulo>
          {loading ? <ActivityIndicator style={{ marginBottom: 20 }} size="large" color="#000" /> : null}

          <FlatList
            data={lista}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            onEndReached={() => {
              if (lista.length <= total && limit < total) {
                setlimit(limit + 15);
              }
            }}
            onEndReachedThreshold={0.1}
          />
        </Page>
      </PTRView>
      <ActionButton
        buttonColor="#2a356a"
        nativeFeedbackRippleColor="rgba(255,255,255,1)"
        useNativeDriver={true}>
        <ActionButton.Item
          buttonColor="#2a356a"
          nativeFeedbackRippleColor="rgba(255,255,255,1)"
          title="Adicionar Ativo"
          onPress={() => navigation.navigate('Ativo')}>
          <IconButton name="addfolder" color="#FFF" size={17} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#2a356a"
          nativeFeedbackRippleColor="rgba(255,255,255,1)"
          title="Fazer Aporte"
          onPress={() => navigation.navigate('Aporte')}>
          <Icon name="credit" color="#FFF" size={17} />
        </ActionButton.Item>
      </ActionButton>
    </>
  );
}
