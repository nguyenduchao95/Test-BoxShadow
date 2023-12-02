import React, {useState} from 'react';
import {
    Grid,
    Paper,
    Box,
    Slider,
    Stack,
    styled,
    Checkbox,
    Button,
    Popover
} from "@mui/material";
import "./boxShadow.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGripVertical, faPencil, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {SketchPicker} from "react-color";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {ResizeProvider, ResizeConsumer} from "react-resize-context";

const BoxShadow = () => {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(2);
    const [css, setCss] = useState([{
        id: 1,
        shiftRight: 0,
        shiftDown: 0,
        spread: 3,
        blur: 3,
        inset: false,
        color: {r: 0, g: 0, b: 0, a: 0.2}
    }]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [bgColor, setBgColor] = useState("#ffff");
    const [boxColor, setBoxColor] = useState("#3d9df6");
    const [openBgColor, setOpenBgColor] = useState(false);
    const [openBoxColor, setOpenBoxColor] = useState(false);
    const [template1Reverse, setTemplate1Reverse] = useState(false);
    const [template2Reverse, setTemplate2Reverse] = useState(false);

    const ColorOutnerBox = styled(Box)(() => ({
        border: '1px solid #ccc',
        width: '50px',
        height: '30px'
    }));

    const ColorInnerBox = styled(Box)(({color}) => ({
        backgroundColor: color,
        border: '5px solid #ffff',
        height: '20px'
    }));

    const returnColor = (index) => {
        return `rgba(${css[index]?.color.r}, ${css[index]?.color.g}, ${css[index]?.color.b}, ${css[index]?.color.a})`
    }

    const handleChangeSlider = (e, newValue) => {
        const key = e.target.name;
        setCss(prevState => {
            const currentCss = {
                ...prevState[currentIndex]
            };
            if (key === 'opacity') {
                currentCss.color.a = newValue / 100;
            } else if (key === 'inset') {
                currentCss[key] = !currentCss[key];
            } else {
                currentCss[key] = newValue;
            }
            prevState[currentIndex] = currentCss;
            return [...prevState];
        });
    }

    const handleChangeColor = (e) => {
        setCss(prevState => {
            const currentCss = {
                ...prevState[currentIndex]
            }
            currentCss.color = e.rgb;
            prevState[currentIndex] = currentCss;
            return [...prevState];
        });
    }

    const handleAddLayer = () => {
        const newLayer = {
            id: id,
            shiftRight: 0,
            shiftDown: 0,
            spread: 3,
            blur: 3,
            inset: false,
            color: {r: 0, g: 0, b: 0, a: 0.2}
        };
        setId(id + 1);
        setCss(prevState => [...prevState, newLayer]);
    }

    const handleDrop = (droppedItem) => {
        if (!droppedItem.destination) return;
        const currentItem = css[currentIndex];
        const updatedList = [...css];
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
        const index = updatedList.findIndex(item => item.id === currentItem.id);
        if (index !== currentIndex) setCurrentIndex(index);
        setCss(updatedList);
    };

    const handleDeleteLayer = (event, itemId) => {
        event.stopPropagation();
        if (css.length <= 1) return;
        const newCss = [...css];
        const index = newCss.findIndex(item => item.id === itemId);
        newCss.splice(index, 1);
        if (index <= currentIndex) {
            setCurrentIndex(currentIndex - 1 > 0 ? currentIndex - 1 : 0);
        }
        setCss(newCss);
    }

    const returnBoxShadow = () => {
        let cssStr = "";
        for (const i of css) {
            cssStr += `rgba(${i?.color.r}, ${i.color.g}, ${i?.color.b}, ${i?.color.a}) ${i?.shiftRight}px ${i?.shiftDown}px ${i?.blur}px ${i?.spread}px${i?.inset ? ' inset' : ''}, `
        }
        return cssStr.substring(0, cssStr.length - 2);
    }
    
    const handleTemplate1 = () => {
        const template1 = [{
            id: 1,
            shiftRight: 5,
            shiftDown: 5,
            spread: 0,
            blur: 0,
            inset: false,
            color: {r: 40, g: 159, b: 237, a: 1}
        },
            {
                id: 2,
                shiftRight: 10,
                shiftDown: 10,
                spread: 0,
                blur: 0,
                inset: false,
                color: {r: 95, g: 184, b: 255, a: 1}
            },
            {
                id: 3,
                shiftRight: 15,
                shiftDown: 15,
                spread: 0,
                blur: 0,
                inset: false,
                color: {r: 161, g: 216, b: 255, a: 1}
            },
            {
                id: 4,
                shiftRight: 20,
                shiftDown: 20,
                spread: 0,
                blur: 0,
                inset: false,
                color: {r: 202, g: 230, b: 255, a: 1}
            },
            {
                id: 5,
                shiftRight: 25,
                shiftDown: 25,
                spread: 0,
                blur: 0,
                inset: false,
                color: {r: 255, g: 238, b: 255, a: 1}
            }
        ]
        if (template1Reverse) template1.reverse();
        setCss(template1);
        setCurrentIndex(0);
        setTemplate1Reverse(!template1Reverse);
    }

    const handleTemplate2 = () => {
        const template2 = [{
            id: 1,
            shiftRight: -1,
            shiftDown: 0,
            spread: 0,
            blur: 4,
            inset: false,
            color: {r: 255, g: 255, b: 255, a: 1}
        },
            {
                id: 2,
                shiftRight: -2,
                shiftDown: 0,
                spread: 0,
                blur: 10,
                inset: false,
                color: {r: 255, g: 255, b: 0, a: 1}
            },
            {
                id: 3,
                shiftRight: -10,
                shiftDown: 0,
                spread: 0,
                blur: 20,
                inset: false,
                color: {r: 255, g: 128, b: 0, a: 1}
            },
            {
                id: 4,
                shiftRight: -18,
                shiftDown: 0,
                spread: 0,
                blur: 40,
                inset: false,
                color: {r: 255, g: 0, b: 0, a: 1}
            }
        ]
        if (template2Reverse) template2.reverse();
        setCss(template2);
        setCurrentIndex(0);
        setTemplate2Reverse(!template2Reverse);
    }

    return (
        <Box marginX="150px">
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper className="content-item">
                        <Box className="content-title">Box-Shadow CSS Generator</Box>

                        <Stack spacing={2} borderBottom="1px solid #ccc" paddingBottom="20px">
                            <Box fontSize="14px">
                                Shift right
                                <Slider value={css[currentIndex]?.shiftRight} min={-50} max={50}
                                        aria-label="Default" valueLabelDisplay="auto" name="shiftRight"
                                        onChange={handleChangeSlider}/>
                            </Box>

                            <Box fontSize="14px">
                                Shift down
                                <Slider value={css[currentIndex]?.shiftDown} min={-50} max={50}
                                        aria-label="Default" valueLabelDisplay="auto" name="shiftDown"
                                        onChange={handleChangeSlider}/>
                            </Box>

                            <Box fontSize="14px">
                                Spread
                                <Slider value={css[currentIndex]?.spread} name="spread"
                                        aria-label="Default" valueLabelDisplay="auto"
                                        onChange={handleChangeSlider}/>
                            </Box>

                            <Box fontSize="14px">
                                Blur
                                <Slider value={css[currentIndex]?.blur} name="blur"
                                        aria-label="Default" valueLabelDisplay="auto"
                                        onChange={handleChangeSlider}/>
                            </Box>

                            <Box fontSize="14px">
                                <span>Opacity</span>
                                <Slider value={Math.round(css[currentIndex]?.color?.a * 100)} name="opacity"
                                        aria-label="Default" valueLabelDisplay="auto" step={1}
                                        onChange={handleChangeSlider}/>
                            </Box>

                            <Box fontSize="14px">
                                <Checkbox checked={css[currentIndex]?.inset} sx={{color: '#5c6ac4', paddingLeft: 0}}
                                          onChange={handleChangeSlider} name="inset"/>
                                <span>Inset</span>
                            </Box>

                            <div>
                                <ColorOutnerBox onClick={() => setOpen(true)}>
                                    <ColorInnerBox
                                        color={`rgb(${css[currentIndex]?.color?.r}, ${css[currentIndex]?.color?.g}, ${css[currentIndex]?.color?.b})`}/>
                                </ColorOutnerBox>
                                <Popover
                                    open={open}
                                    onClose={() => setOpen(false)}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                >
                                    <SketchPicker color={returnColor(currentIndex)}
                                                  onChangeComplete={handleChangeColor}/>
                                </Popover>
                            </div>
                        </Stack>

                        <Box marginTop="20px">
                            <Button variant="outlined" className="btn-add" onClick={handleAddLayer}>
                                Add layer
                            </Button>
                            <div>
                                <DragDropContext onDragEnd={handleDrop}>
                                    <Droppable droppableId="droppable">
                                        {(provided) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                            >
                                                {css.map((item, index) => (
                                                    <Draggable key={item.id} draggableId={`${item.id}`}
                                                               index={index}>
                                                        {(provided) => (
                                                            <div
                                                                className={`list-item ${currentIndex === index ? 'active' : ''}`}
                                                                onClick={() => setCurrentIndex(index)}
                                                                ref={provided.innerRef}
                                                                {...provided.dragHandleProps}
                                                                {...provided.draggableProps}
                                                            >
                                                                <Box>
                                                                    <FontAwesomeIcon icon={faGripVertical}/>
                                                                    {`${item.inset ? 'inset ' : ''}${item.shiftRight}px ${item.shiftDown}px ${item.blur}px ${item.spread}px ${returnColor(index)}`}
                                                                </Box>
                                                                <Box>
                                                                    <FontAwesomeIcon icon={faPencil}/>
                                                                    <FontAwesomeIcon icon={faTrashCan}
                                                                                     onClick={(event) => handleDeleteLayer(event, item.id)}/>
                                                                </Box>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </div>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper elevation={3} className="content-item">
                                <Box className="preview">
                                    <span className="content-title">Preview</span>
                                    <div className="preview-right">
                                        <div className="preview-right-1">
                                            <ColorOutnerBox onClick={() => setOpenBgColor(true)}>
                                                <ColorInnerBox color={bgColor}/>
                                            </ColorOutnerBox>
                                            <Popover
                                                open={openBgColor}
                                                onClose={() => setOpenBgColor(false)}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                            >
                                                <SketchPicker color={bgColor}
                                                              onChangeComplete={e => setBgColor(e.hex)}/>
                                            </Popover>
                                        </div>

                                        <div>
                                            <ColorOutnerBox onClick={() => setOpenBoxColor(true)}>
                                                <ColorInnerBox color={boxColor}/>
                                            </ColorOutnerBox>
                                            <Popover
                                                open={openBoxColor}
                                                onClose={() => setOpenBoxColor(false)}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                            >
                                                <SketchPicker color={boxColor}
                                                              onChangeComplete={e => setBoxColor(e.hex)}/>
                                            </Popover>
                                        </div>
                                    </div>
                                </Box>

                                <Box sx={{background: bgColor, padding: '20px'}}>
                                    <ResizeProvider>
                                        <ResizeConsumer
                                            className="container-resize"
                                            style={{background: boxColor, boxShadow: returnBoxShadow()}}
                                        >
                                        </ResizeConsumer>
                                    </ResizeProvider>
                                </Box>

                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper elevation={3} className="content-item">
                                <Box className="content-title">CSS Code</Box>
                                <code>
                                    box-shadow: {returnBoxShadow()};
                                </code>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper elevation={3} className="content-item">
                                <Box className="content-title">Template</Box>
                                <Box>
                                    <Box className="template template-1" onClick={handleTemplate1}></Box>
                                    <Box className="template template-2" onClick={handleTemplate2}></Box>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default BoxShadow;