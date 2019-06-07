import React from "react";

//Style
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

//Icons
import Info from "@material-ui/icons/Info";
import FilterVintage from "@material-ui/icons/FilterVintage";
import Warning from "@material-ui/icons/Warning";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";

//Components
import StackGrid from "react-stack-grid";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import Overlay from "views/Components/Overlay.jsx";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";

//Images
import caoEncontrado from "assets/img/caoEncontrado.jpg"
import alf from "assets/img/alf.jpg"

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        classGrid: [], 
        classText: [],
        modalLotados: false,
        modalEncontrado: false,
        refreshPage: false
      };
    }
    componentDidMount(){
      window.scrollTo(0,0);
    }
    handleClickOpen(modal) {
      var x = [];
      x[modal] = true;
      this.setState(x);
    }
    handleClose(modal) {
      var x = [];
      x[modal] = false;
      this.setState(x);
    }
    setLayout() {
      if (this.grid !== undefined) {
        const { classes } = this.props;
        const lengthChildren = this.grid.props.children.length;
        for (let i = 0; i < lengthChildren; i++) {
          const item = this.grid.props.children[i];
          const itemHeight = document.getElementById(item.props.id).clientHeight;
          
          if (itemHeight > 250) {
            if (item.props.hasImage) {
              const itemDescHeight = document.getElementById("pInfoDesc" + i).clientHeight;

              if (itemDescHeight > 150){
                this.state.classGrid.push(undefined);
                this.state.classText.push(classes.maxHeightTextImage);
              }
              else {
                this.state.classGrid.push(undefined);
                this.state.classText.push(undefined);
              }
            }
            else {
              this.state.classGrid.push(classes.maxHeightText);
              this.state.classText.push(undefined);
            }
          }
          else{
            this.state.classGrid.push(undefined);
            this.state.classText.push(undefined);            
          }
        }
      }
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
              <Parallax filter image={require("../assets/img/header.jpg")}>
                <div className={classes.container}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <h1 className={classes.title}>A felicidade tem uma forma!</h1>
                      <h4>
                        São tantos os animais que necessitam de apoio no Distrito de Bragança. A
                        nossa organização sem fins lucrativos, tem como objetivo promover o Bem Estar dos Animais e dar voz aos seus direitos,
                        em especial aos cães, animais que conseguem sob quaisquer circuntâncias
                        alegrar o ambiente familiar.
                      </h4>
                    </GridItem>
                  </GridContainer>
                </div>
              </Parallax>
              <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                  <div className={classes.section}>
                    <GridContainer justify="center">
                      <GridItem className={classes.gridItemTitle} xs={12} sm={12} md={8}>
                        <h2 className={classNames(classes.titleWrning, classes.title)}>Vamos falar sobre os animais?</h2>
                      </GridItem>
                    </GridContainer>
                    <StackGrid gridRef={grid => this.grid = grid} onLayout={this.setLayout()} columnWidth={"33.33%"}>
                      <GridItem id={"xxx"} hasImage={false} xs>
                        <InfoArea
                          title="Abandono não!"
                          description={<span>Campanha da <a className={classes.hoverUnderline} href="https://www.facebook.com/animalife.pt">Animalife</a> com a participação do Grupo Operacional Cinotécnico da Unidade Especial de Polícia da PSP. 
                          O jornal <a className={classes.hoverUnderline} href="https://www.facebook.com/Publico">Público</a> destaca a campanha e nós os nossos “atores”! 
                          Nunca é demais relembrar: não abandone ou maltrate os animais. <br/> <a className={classes.hoverUnderline} style={{float: "right"}} href="https://www.publico.pt/2019/05/14/p3/video/uma-campanha-contra-o-abandono-de-animais-porque-ele-nunca-te-vai-esquecer-20190514-122859">Veja a notícia completa.</a></span>}
                          icon={Info}
                          iconColor="danger"
                          vertical={false}
                          classGrid={this.state.classGrid[0]}
                        />
                      </GridItem>
                      <GridItem id={"yyy"} hasImage={false} xs>
                        <InfoArea
                          title="Estamos Lotados 😥"
                          description={<span>{this.state.classGrid[1] !== undefined ? <span onClick={() => this.handleClickOpen("modalLotados")} className={classNames(classes.hoverUnderline, classes.spanVerMais)}>Ver Mais</span> : ""}<span className={this.state.classGrid[1]}>
                            {this.state.classGrid[1] !== undefined ? <Overlay/> : ""}
                            Neste momento, a Associação Amicus Canis-AMICA, NÃO consegue acolher mais animais. ESTAMOS LOTADOS!!!!!
                            Temos 9 cães no espaço que utilizamos, com duas boxes, e mais animais em Famílias de Acolhimento (FAT)! Neste momento é-nos impossível o acolhimento de mais cães. Para que entendam, os 9 animais, formam grupo dentro das boxes. Para colocar lá outro, teríamos que os adaptar primeiro durante algum tempo ao grupo, senão podem atacá-lo e seria trágico. 
                            Se alguém puder ser FAT, é a melhor ajuda que nos pode dar para retirarmos animais da rua.
                            Agradecemos o apoio e a compreensão de todos!
                            Obrigada 🐾
                            </span></span>
                          }
                          icon={Warning}
                          iconColor="warning"
                          vertical={false}
                          descriptionClassWrapper={this.state.classGrid[1] !== undefined ? classes.descriptionClassWrapper : ""}
                        />
                      </GridItem>
                      <GridItem id={"zzz"} hasImage={false} xs>
                        <InfoArea
                          title="Gatinha para adoção"
                          description={<span>Gatinha recolhida da rua à procura de uma família que a ame e cuide para sempre.
                          É um poço de ternura.
                          Se estiver interessado envie mensagem, caso não possa divulgue e partilhe para encontrar um lar a esta princesa ❤🐾
                          </span>}
                          icon={FilterVintage}
                          iconColor="success"
                          vertical={false}
                          classGrid={this.state.classGrid[2]}
                        />
                      </GridItem>
                      <GridItem id={"qqq"} hasImage={true} xs>
                        <InfoArea
                          title="Cão encontrado"
                          description={<span>{this.state.classText[3] !== undefined ? <span onClick={() => this.handleClickOpen("modalEncontrado")} className={classNames(classes.hoverUnderline, classes.spanVerMais)}>Ver Mais</span> : ""}<img width={"100%"} src={caoEncontrado}></img><p id={"pInfoDesc3"} className={this.state.classText[3]}>{this.state.classText[3] !== undefined ? <Overlay/> : ""}Este cão foi encontrado em Bragança na rua. Está acolhido por quem o encontrou. 
                            Alguém sabe quem é o dono? Precisamos encontra-lo para que consiga voltar a felicidade da sua casa e aproveitar para descansar das voltas a que andou nas ruas da cidade.
                            Esperamos que logo o seu dono seja encontrado para que o cãozinho não fiquei deprimido pela falta de pessoas conhecidas.</p></span>}
                          icon={Warning}
                          iconColor="warning"
                          vertical={false}
                          descriptionClassWrapper={this.state.classText[3] !== undefined ? classes.descriptionClassWrapper : ""}
                        />
                      </GridItem>
                      <GridItem id={"aaa"} hasImage={true} xs>
                        <InfoArea
                          title="Cão para adoção"
                          description={<span><img width={"100%"} src={alf}></img><p id={"pInfoDesc4"} className={this.state.classText[4]}>{this.state.classText[4] !== undefined ? <Overlay/> : ""}Para adoção responsável ou F.A.T.! (Bragança)
                            Cão muito meigo, esterilizado. Dá-se bem com outros animais. Está sociabilizado.</p></span>}
                          icon={Favorite}
                          iconColor="success"
                          vertical={false}
                        />
                      </GridItem>
                    </StackGrid>
                    <Dialog
                      classes={{
                        root: classes.center,
                        paper: classes.modal
                      }}
                      open={this.state.modalLotados}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={() => this.handleClose("modalLotados")}
                      aria-labelledby="modal-slide-title"
                      aria-describedby="modal-slide-description">
                      <DialogTitle
                        id="classic-modal-slide-title"
                        disableTypography
                        className={classes.modalHeader}>
                        <IconButton
                          className={classes.modalCloseButton}
                          key="close"
                          aria-label="Close"
                          color="inherit"
                          onClick={() => this.handleClose("modalLotados")}>
                          <Close className={classes.modalClose} />
                        </IconButton>
                        <h4 className={classNames(classes.modalTitle, classes.titleWrning)}>Estamos Lotados 😥</h4>
                      </DialogTitle>
                      <DialogContent
                        id="modal-slide-description"
                        className={classes.modalBody}>
                        <label className={classes.descriptionModal}>
                            Neste momento, a Associação Amicus Canis-AMICA, NÃO consegue acolher mais animais. ESTAMOS LOTADOS!!!!!
                            Temos 9 cães no espaço que utilizamos, com duas boxes, e mais animais em Famílias de Acolhimento (FAT)! Neste momento é-nos impossível o acolhimento de mais cães. Para que entendam, os 9 animais, formam grupo dentro das boxes. Para colocar lá outro, teríamos que os adaptar primeiro durante algum tempo ao grupo, senão podem atacá-lo e seria trágico. 
                            Se alguém puder ser FAT, é a melhor ajuda que nos pode dar para retirarmos animais da rua.
                            Agradecemos o apoio e a compreensão de todos!
                            Obrigada 🐾
                        </label>
                      </DialogContent>
                    </Dialog>
                    <Dialog
                      classes={{
                        root: classes.center,
                        paper: classes.modal
                      }}
                      open={this.state.modalEncontrado}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={() => this.handleClose("modalEncontrado")}
                      aria-labelledby="modal-slide-title"
                      aria-describedby="modal-slide-description">
                      <DialogTitle
                        id="classic-modal-slide-title"
                        disableTypography
                        className={classes.modalHeader}>
                        <IconButton
                          className={classes.modalCloseButton}
                          key="close"
                          aria-label="Close"
                          color="inherit"
                          onClick={() => this.handleClose("modalEncontrado")}>
                          <Close className={classes.modalClose} />
                        </IconButton>
                        <h4 className={classNames(classes.modalTitle, classes.titleWrning)}>Cão Encontrado</h4>
                      </DialogTitle>
                      <DialogContent
                        id="modal-slide-description"
                        className={classes.modalBody}>
                        <label className={classes.descriptionModal}>Este cão foi encontrado em Bragança na rua. Está acolhido por quem o encontrou. 
                            Alguém sabe quem é o dono? Precisamos encontra-lo para que consiga voltar a felicidade da sua casa e aproveitar para descansar das voltas a que andou nas ruas da cidade.
                            Esperamos que logo o seu dono seja encontrado para que o cãozinho não fiquei deprimido pela falta de pessoas conhecidas.</label>
                        <img width={"100%"} src={caoEncontrado}></img>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>            
            </div>
        )
    }
}

export default  withStyles(landingPageStyle)(Home);