import React, { Fragment, useState } from "react";

//Styles
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import PartnersStyle from "assets/jss/material-kit-react/views/Partners.jsx";

//Images
import avVeterinaria from "assets/img/avVeterinaria.png"
import briFitness from "assets/img/briFitness.png"
import brigoffice from "assets/img/brigoffice.png"
import chamauto from "assets/img/chamauto.png"
import clinicaValeAlva from "assets/img/clinicaValeAlva.png"
import donaFlorinda from "assets/img/donaFlorinda.png"
import fisioSaude from "assets/img/fisioSaude.png"
import novavet from "assets/img/novavet.png"
import quintaDasQueimadas from "assets/img/quintaDasQueimadas.png"
import senhoraPereiras from "assets/img/senhoraPereiras.png"
import tascaNoz from "assets/img/tascaNoz.png"
import vetCantarias from "assets/img/vetCantarias.png"
import vetCenter from "assets/img/vetCenter.png"
import vetSantiago from "assets/img/vetSantiago.png"

//Components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from 'components/CustomButtons/Button.jsx';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";

//Icons
import Check from "@material-ui/icons/Check";

class Partners extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          date: null,
          checked: false
      }
    }
    componentDidMount(){
      window.scrollTo(0,0);      
    }
    handleDateChange(date) {
        var x = [];
        x["date"] = date;
        this.setState(x);
    }
    handleToggle() {
        this.setState({checked: !this.state.checked});
    }
    render() {
        const { classes } = this.props;
        return (  
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <div className={classes.section}>
                        <GridContainer justify="center">
                            <GridItem className={classes.gridItemTitle} xs={12} sm={12} md={8}>
                                <h2 className={classNames(classes.titleWrning, classes.title)}>Ser Sócio</h2>
                            </GridItem>
                        </GridContainer>
                        <GridContainer xs={12}>
                            <GridItem xs={12}>
                                <p className={classes.primaryColor}>
                                    A Associação Amicus Canis – AMICA, ajuda muitos animais, esterilizando-os para que não se reproduzam e para potenciar a sua adoção, alimentando-os e tratando-os quando estão doentes.
                                    Por 15 € anuais, pode ser sócio da AMICA e possibilitar a ajuda a mais animais. Este cartão, de validade anual, dá-lhe acesso a descontos e vantagens em várias empresas amigas dos animais que apoiam a nossa causa.
                                </p>
                            </GridItem>
                            <GridItem xs={6}>
                                <CustomInput
                                    labelText="Nome"
                                    id="nome"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={4}>
                                <CustomInput
                                    labelText="Número Contribuinte"
                                    id="numContribuinte"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem> 
                            <GridItem xs={2}>
                                <CustomInput
                                    datepicker={true}
                                    labelText="Data de Nascimento"
                                    id="dataNascimento"
                                    dateFormat="dd/MM/yyyy"
                                    valueDate={this.state.date}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    onChangeDate={date => this.handleDateChange(date)}
                                />
                            </GridItem>
                            <GridItem xs={6}>
                                <CustomInput
                                    labelText="Morada"
                                    id="morada"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={4}>
                                <CustomInput
                                    labelText="Localidade"
                                    id="localidade"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={2}>
                                <CustomInput
                                    labelText="Código Postal"
                                    id="codigoPostal"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={6}>
                                <CustomInput
                                    labelText="Email"
                                    id="email"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={4}>
                                <CustomInput
                                    labelText="Profissão"
                                    id="profissao"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={2}>
                                <CustomInput
                                    labelText="Telefone"
                                    id="telefone"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={6} className={classes.primaryColor}> 
                                <p className={classes.contactAccountSub}>Alem deste cadastro é necessário enviar o comprovante do depósito para nós.<br/>EMAIL: AssociacaoAmica@hotmail.com<br/>IBAN: PT50 0045 2216 4027 1549 63919<br/>IBAN/SWIFT: CCCMPTPL</p>
                            </GridItem>
                            <GridItem xs={4} className={classes.contactSendMessage}>
                                <div className={classNames(classes.checkboxAndRadio, classes.checkboxAndRadioHorizontal)}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                tabIndex={-1}
                                                onClick={() => this.handleToggle()}
                                                checkedIcon={<Check className={classes.checkedIcon} />}
                                                icon={<Check className={classes.uncheckedIcon} />}
                                                classes={{ checked: classes.checked }}
                                            />
                                        }
                                        classes={{ label: classes.label }}
                                        label="Aceito os termos"
                                    />
                                </div>
                            </GridItem>
                            <GridItem xs={2} className={classes.contactSendMessage}>
                                <Button className={classes.buttonContactSendMessage} type="button" color={this.state.checked ? "primary" : "default"}>Registrar</Button>
                            </GridItem>
                        </GridContainer>
                        <GridContainer xs={12}>
                            <GridItem xs={12} className={classNames(classes.primaryColor, classes.textCenter)}>
                                <p>Termos e Condições:</p>
                            </GridItem>
                            <GridItem xs={6} className={classes.primaryColor}>
                                <ul>
                                    <li>Os parceiros serão atualizados à medida de novas parcerias.</li>
                                    <li>No pagamento da cota anual, recebem uma vinheta que cola no cartão que lhes é fornecido.</li>
                                    <li>Os cartões e as vinhetas serão levantados no posto da Galp, Sacor, junto ao Polis.</li>
                                </ul>
                            </GridItem>
                            <GridItem xs={6} className={classes.primaryColor}>
                                <ul>
                                    <li>Nos vários parceiros, através da apresentação do cartão, têm direito aos descontos acordados.</li>    
                                    <li>No caso de o sócio não pagar as cotas durante dois anos consecutivos será eliminado da lista de sócios.</li>
                                </ul>
                            </GridItem>
                        </GridContainer>
                        <GridContainer xs={12} className={classes.companyGrid}>
                            <GridItem xs={2} className={classes.companyGridItem}>
                                <Tooltip
                                    id="avVeterinariaTooltip"
                                    title="Os sócios da AMICA terão uma bonificação de 10%
                                    em serviços médico-veterinários e 5% em
                                    medicamentos/produtos nos CAMVs de Bragança,
                                    até um limite de 4 animais por sócio (máximo de 3
                                    cães ou 4 gatos)."
                                    placement="auto"
                                    classes={{ tooltip: classes.tooltip }}
                                >
                                    <div className={classes.companyImgContainer}>
                                        <img src={avVeterinaria} alt="Last slide" className={classes.imgFluid}/>
                                    </div>
                                </Tooltip>
                            </GridItem>                                
                            <GridItem xs={2} className={classes.companyGridItem}>
                                <Tooltip
                                    id="tascaNozTooltip"
                                    title="Os sócios da Amica beneficiam de 5% em jantares
                                    com valor mínmo de 10€/pessoa."
                                    placement="auto"
                                    classes={{ tooltip: classes.tooltip }}
                                >
                                    <div className={classes.companyImgContainer}>
                                        <img src={tascaNoz} alt="Last slide" className={classes.imgFluid}/>
                                    </div>
                                </Tooltip>
                            </GridItem>
                            <GridItem xs={2} className={classes.companyGridItem}>
                                <Tooltip
                                    id="fisioSaudeTooltip"
                                    title="Os sócios da Amica beneficiam de 20% em todos os
                                    tratamentos"
                                    placement="auto"
                                    classes={{ tooltip: classes.tooltip }}
                                >
                                    <div className={classes.companyImgContainer}>
                                        <img src={fisioSaude} alt="Last slide" className={classes.imgFluid}/>
                                    </div>
                                </Tooltip>
                            </GridItem>                                
                            <GridItem xs={2} className={classes.companyGridItem}>
                            <div className={classes.companyImgContainer}>
                                <img src={chamauto} alt="Last slide" className={classes.imgFluid}/>
                                </div>
                            </GridItem>
                            <GridItem xs={2} className={classes.companyGridItem}>
                            <div className={classes.companyImgContainer}>
                                <img src={clinicaValeAlva} alt="Last slide" className={classes.imgFluid}/>
                                </div>
                            </GridItem>
                            <GridItem xs={2} className={classes.companyGridItem}>
                            <div className={classes.companyImgContainer}>
                                <img src={donaFlorinda} alt="Last slide" className={classes.imgFluid}/>
                                </div>
                            </GridItem>
                            <GridItem xs={2} className={classes.companyGridItem}>
                            <div className={classes.companyImgContainer}>
                                <img src={brigoffice} alt="Last slide" className={classes.imgFluid}/>
                                </div>
                            </GridItem>
                            <GridItem xs={2} className={classes.companyGridItem}>
                            <div className={classes.companyImgContainer}>
                                <img src={novavet} alt="Last slide" className={classes.imgFluid}/>
                                </div>
                            </GridItem>
                            <GridItem xs={2} className={classes.companyGridItem}>
                                <div className={classes.companyImgContainer}>
                                    <img src={quintaDasQueimadas} alt="Last slide" className={classes.imgFluid}/>
                                </div>                                    
                            </GridItem>
                            <GridItem xs={2} className={classes.companyGridItem}>
                            <div className={classes.companyImgContainer}>
                                <img src={vetCantarias} alt="Last slide" className={classes.imgFluid}/>
                                </div>
                            </GridItem>
                            <GridItem xs={2} className={classes.companyGridItem}>
                            <div className={classes.companyImgContainer}>
                                <img src={vetCenter} alt="Last slide" className={classes.imgFluid}/>
                                </div>
                            </GridItem>
                            <GridItem xs={2} className={classes.companyGridItem}>
                            <div className={classes.companyImgContainer}>
                                <img src={vetSantiago} alt="Last slide" className={classes.imgFluid}/>
                                </div>
                            </GridItem>
                            <GridItem xs={2} className={classes.companyGridItem}>
                            <div className={classes.companyImgContainer}>
                                <img src={senhoraPereiras} alt="Last slide" className={classes.imgFluid}/>
                                </div>
                            </GridItem>
                            <GridItem xs={2} className={classes.companyGridItem}>
                            <div className={classes.companyImgContainer}>
                                <img src={briFitness} alt="Last slide" className={classes.imgFluid}/>
                                </div>
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(PartnersStyle)(Partners);