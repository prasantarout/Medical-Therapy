import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import SafeView from '../../../components/common/SafeView'
import NavBar from '../../../components/common/NavBar'
import css from '../../../themes/space'
import TitleTxt from '../../../components/common/TitleTxt'
import SimpleInput from '../../../components/inputs/SimpleInput'
import SimpleDropDown from '../../../components/common/SimpleDropDown'
import { therapistList } from '../../../utils/dumpAPI'
import { Genders } from '../../../utils/LocalData'
import OptionsTable from '../../../components/common/OptionsTable'
import Txt from '../../../components/micro/Txt'
import RadioButton from '../../../components/micro/RadioButton'
import Button from '../../../components/buttons/Button'
import CustomModal from '../../../components/common/CustomModal'
import { icons } from '../../../themes/icons'

const EvaluationForm = (props) => {
    const [therapist, setTherapist] = useState("")
    const [gender, setGender] = useState("")
    const [scoreCheck, setScoreCheck] = useState("")
    const [isModalVisible, setIsModalVisible] = useState(false)

    const renderScoreCheck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const handleSubmit = () => {
        setIsModalVisible(true);
        setTimeout(() => {
            setTimeout(() => {
                props.navigation.navigate('Assignments')
            }, 1500)
            setIsModalVisible(false);
        }, 1800)
    }

    return (
        <>
            <SafeView {...props}>
                <View style={[css.px4]}>
                    <TitleTxt title="Evaluation Form" />
                    <View style={[css.card]} >
                        <View style={[css.row, css.fw, css.aic]}>
                            <View style={[css.w50]}>
                                <SimpleInput
                                    title="First Name"
                                    style={[css.mr2]}
                                    value={[]}
                                    placeholder="Enter First Name"
                                    onChangeText={(val) => console.log("First Name")}
                                />
                            </View>
                            <View style={[css.w50]}>
                                <SimpleInput
                                    title="Last Name"
                                    style={[css.ml2]}
                                    value={[]}
                                    placeholder="Enter Last Name"
                                    onChangeText={(val) => console.log("Last Name")}
                                />
                            </View>
                            <View style={[css.w50, css.mt10]}>
                                <SimpleInput
                                    title="Email"
                                    style={[css.mr2]}
                                    value={[]}
                                    placeholder="Enter Email"
                                    onChangeText={(val) => console.log("Email")}
                                />
                            </View>
                            <View style={[css.w50, css.mt10]}>
                                <SimpleInput
                                    title="Phone Number"
                                    style={[css.ml2]}
                                    value={[]}
                                    placeholder="Enter Phone Number"
                                    onChangeText={(val) => console.log("Phone Number")}
                                />
                            </View>

                            <View style={[css.w50]}>
                                <SimpleDropDown
                                    data={therapistList}
                                    title="Therapist Name"
                                    style={[css.mr2]}
                                    value={therapist}
                                    placeholder="Select Therapist"
                                    onChange={(item) => setTherapist(item.value)}
                                />
                            </View>
                            <View style={[css.w50]}>
                                <SimpleDropDown
                                    data={Genders}
                                    title="Gender"
                                    style={[css.ml2]}
                                    value={gender}
                                    placeholder="Select Gender"
                                    onChange={(item) => setGender(item.value)}
                                />
                            </View>

                            <View style={[css.mt20, css.w100]}>
                                <OptionsTable
                                />
                            </View>
                            <View style={[css.w100]}>
                                <SimpleInput
                                    title="What were the therapist's shortfalls?"
                                    titleStyle={[css.medium, css.fs23]}
                                    style={[css.mr2]}
                                    value={[]}
                                    placeholder="Type..."
                                    onChangeText={(val) => console.log("First Name")}
                                />
                            </View>
                            <View style={[css.w100, css.mt10]}>
                                <SimpleInput
                                    title="What were the therapist's strongest parts?"
                                    titleStyle={[css.medium, css.fs23]}
                                    style={[css.mr2]}
                                    value={[]}
                                    placeholder="Type..."
                                    onChangeText={(val) => console.log("First Name")}
                                />
                            </View>
                            <View style={[css.w100, css.mt10]}>
                                <SimpleInput
                                    title="What were the therapist's strongest parts?"
                                    titleStyle={[css.medium, css.fs23]}
                                    style={[css.mr2]}
                                    value={[]}
                                    placeholder="Type..."
                                    onChangeText={(val) => console.log("First Name")}
                                />
                            </View>
                            <View style={[css.w100, css.mt10]}>
                                <Txt style={[css.fs23, css.medium]} >On a scale of 1-10 , what score would you give to the therapist?</Txt>
                                <View style={[css.row, css.mt1]} >
                                    {renderScoreCheck.map((item, index) => {
                                        return (
                                            <View style={[css.mr1, css.aic]}>
                                                <RadioButton
                                                    isChecked={index <= scoreCheck ? true : false}
                                                    onPress={() => setScoreCheck(index)}
                                                />
                                                {index == 0 ?
                                                    <Txt style={[css.medium, css.mt1]}>Worst</Txt>
                                                    : index == 9 ? <Txt style={[css.medium, css.mt1]}>Best</Txt> : null}
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>
                            <View style={[css.w100]}>
                                <SimpleInput
                                    title="What needs to be improved?"
                                    titleStyle={[css.medium, css.fs23]}
                                    style={[css.mr2]}
                                    value={[]}
                                    placeholder="Type..."
                                    onChangeText={(val) => console.log("First Name")}
                                />
                            </View>
                            <View style={[css.w100, css.mt10]}>
                                <SimpleInput
                                    title="Please let us have any further comments/feedback."
                                    titleStyle={[css.medium, css.fs23]}
                                    style={[css.mr2]}
                                    value={[]}
                                    placeholder="Type..."
                                    onChangeText={(val) => console.log("First Name")}
                                />
                            </View>
                            <View style={[css.w100, css.row]}>
                                <Button title="Submit" onPress={handleSubmit} />
                            </View>
                        </View>
                    </View>
                </View>
            </SafeView>
            <CustomModal
                isVisible={isModalVisible}
                onCloseRequest={() => setIsModalVisible(false)}
                icon={icons.thanku}
                title="Thank You"
                subtitle="Thank you for your valuable feedback"
            />
        </>
    )
}

export default EvaluationForm

const styles = StyleSheet.create({})
